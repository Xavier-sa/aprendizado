import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { TransactionType } from "@prisma/client";

export interface TransactionFilters {
  from?: Date;
  to?: Date;
  categoryId?: string;
  type?: TransactionType;
  search?: string;
}

function buildWhere(filters: TransactionFilters): Prisma.TransactionWhereInput {
  const where: Prisma.TransactionWhereInput = {};
  if (filters.from || filters.to) {
    where.transactionDate = {
      ...(filters.from ? { gte: filters.from } : {}),
      ...(filters.to ? { lte: filters.to } : {}),
    };
  }
  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.type) where.type = filters.type;
  if (filters.search) {
    where.description = { contains: filters.search, mode: "insensitive" };
  }
  return where;
}

export interface MonthlyTotal {
  month: string; // YYYY-MM-01
  income: number;
  expense: number;
}

export const transactionRepository = {
  create(data: Prisma.TransactionUncheckedCreateInput) {
    return prisma.transaction.create({ data, include: { category: true } });
  },

  findMany(filters: TransactionFilters = {}) {
    return prisma.transaction.findMany({
      where: buildWhere(filters),
      include: { category: true },
      orderBy: { transactionDate: "desc" },
    });
  },

  findById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  findLast() {
    return prisma.transaction.findFirst({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  },

  update(id: string, data: Prisma.TransactionUncheckedUpdateInput) {
    return prisma.transaction.update({
      where: { id },
      data,
      include: { category: true },
    });
  },

  delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  },

  count(filters: TransactionFilters = {}) {
    return prisma.transaction.count({ where: buildWhere(filters) });
  },

  async sumByType(filters: TransactionFilters = {}) {
    const result = await prisma.transaction.aggregate({
      where: buildWhere(filters),
      _sum: { amount: true },
    });
    return Number(result._sum.amount ?? 0);
  },

  async sumByCategory(filters: TransactionFilters = {}) {
    const grouped = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: buildWhere(filters),
      _sum: { amount: true },
    });
    return grouped.map((row) => ({
      categoryId: row.categoryId,
      total: Number(row._sum.amount ?? 0),
    }));
  },

  /** Totais mensais de receita/despesa dos últimos `months` meses (inclui o mês atual). */
  async monthlySeries(months: number): Promise<MonthlyTotal[]> {
    const rows = await prisma.$queryRaw<
      { month: Date; type: TransactionType; total: Prisma.Decimal }[]
    >(Prisma.sql`
      SELECT date_trunc('month', "transactionDate") AS month, "type", SUM("amount") AS total
      FROM "Transaction"
      WHERE "transactionDate" >= date_trunc('month', now()) - (${months - 1} || ' months')::interval
      GROUP BY 1, 2
      ORDER BY 1 ASC
    `);

    const byMonth = new Map<string, MonthlyTotal>();
    for (const row of rows) {
      const key = row.month.toISOString().slice(0, 10);
      const entry = byMonth.get(key) ?? { month: key, income: 0, expense: 0 };
      if (row.type === "INCOME") entry.income = Number(row.total);
      else entry.expense = Number(row.total);
      byMonth.set(key, entry);
    }
    return Array.from(byMonth.values()).sort((a, b) =>
      a.month.localeCompare(b.month),
    );
  },

  /** Saldo total (receitas - despesas) considerando todo o histórico. */
  async totalBalance() {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: "INCOME" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      }),
    ]);
    return Number(income._sum.amount ?? 0) - Number(expense._sum.amount ?? 0);
  },

  /** Saldo acumulado (receitas - despesas) de tudo que ocorreu antes de `date`. */
  async balanceBefore(date: Date) {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: "INCOME", transactionDate: { lt: date } },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { type: "EXPENSE", transactionDate: { lt: date } },
        _sum: { amount: true },
      }),
    ]);
    return Number(income._sum.amount ?? 0) - Number(expense._sum.amount ?? 0);
  },
};

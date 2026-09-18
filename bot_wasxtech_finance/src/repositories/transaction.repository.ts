import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { TransactionType } from "@prisma/client";
import { addCivilMonths, startOfCivilMonth } from "@/lib/dates";

export interface TransactionFilters {
  from?: Date;
  to?: Date;
  categoryId?: string;
  type?: TransactionType;
  search?: string;
}

function buildWhere(
  userId: string,
  filters: TransactionFilters,
): Prisma.TransactionWhereInput {
  const where: Prisma.TransactionWhereInput = { userId };
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

  findMany(userId: string, filters: TransactionFilters = {}) {
    return prisma.transaction.findMany({
      where: buildWhere(userId, filters),
      include: { category: true },
      orderBy: { transactionDate: "desc" },
    });
  },

  findById(id: string, userId: string) {
    return prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true },
    });
  },

  findLast(userId: string) {
    return prisma.transaction.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  },

  /** Retorna null se a movimentação não existir OU não pertencer a `userId`. */
  async update(id: string, userId: string, data: Prisma.TransactionUncheckedUpdateInput) {
    const result = await prisma.transaction.updateMany({
      where: { id, userId },
      data,
    });
    if (result.count === 0) return null;
    return prisma.transaction.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  /** Retorna `false` se a movimentação não existir OU não pertencer a `userId`. */
  async delete(id: string, userId: string): Promise<boolean> {
    const result = await prisma.transaction.deleteMany({ where: { id, userId } });
    return result.count > 0;
  },

  count(userId: string, filters: TransactionFilters = {}) {
    return prisma.transaction.count({ where: buildWhere(userId, filters) });
  },

  async sumByType(userId: string, filters: TransactionFilters = {}) {
    const result = await prisma.transaction.aggregate({
      where: buildWhere(userId, filters),
      _sum: { amount: true },
    });
    return Number(result._sum.amount ?? 0);
  },

  async sumByCategory(userId: string, filters: TransactionFilters = {}) {
    const grouped = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: buildWhere(userId, filters),
      _sum: { amount: true },
    });
    return grouped.map((row) => ({
      categoryId: row.categoryId,
      total: Number(row._sum.amount ?? 0),
    }));
  },

  /**
   * Totais mensais de receita/despesa dos últimos `months` meses (inclui
   * o mês atual), só de `userId`. O limite inferior é calculado em JS a
   * partir do mês civil (fuso de `APP_TIME_ZONE`, ver `src/lib/dates.ts`)
   * — não usa `now()` do Postgres, que reflete o fuso da sessão do banco,
   * não o do usuário.
   */
  async monthlySeries(
    userId: string,
    months: number,
    reference: Date = new Date(),
  ): Promise<MonthlyTotal[]> {
    const from = addCivilMonths(startOfCivilMonth(reference), -(months - 1));
    const rows = await prisma.$queryRaw<
      { month: Date; type: TransactionType; total: Prisma.Decimal }[]
    >(Prisma.sql`
      SELECT date_trunc('month', "transactionDate") AS month, "type", SUM("amount") AS total
      FROM "Transaction"
      WHERE "userId" = ${userId}
        AND "transactionDate" >= ${from}
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

  /** Saldo total (receitas - despesas) de `userId`, considerando todo o histórico. */
  async totalBalance(userId: string) {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId, type: "INCOME" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { userId, type: "EXPENSE" },
        _sum: { amount: true },
      }),
    ]);
    return Number(income._sum.amount ?? 0) - Number(expense._sum.amount ?? 0);
  },

  /** Saldo acumulado de `userId` (receitas - despesas) de tudo que ocorreu antes de `date`. */
  async balanceBefore(userId: string, date: Date) {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId, type: "INCOME", transactionDate: { lt: date } },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { userId, type: "EXPENSE", transactionDate: { lt: date } },
        _sum: { amount: true },
      }),
    ]);
    return Number(income._sum.amount ?? 0) - Number(expense._sum.amount ?? 0);
  },
};

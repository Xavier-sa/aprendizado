import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { addCivilMonths, startOfCivilMonth } from "@/lib/dates";
import type { AdminTransactionFilters, AdminUsersFilters } from "@/schemas/admin.schema";

const userSelect = {
  id: true, name: true, email: true, role: true, createdAt: true,
  _count: { select: { transactions: true } },
} satisfies Prisma.UserSelect;
const transactionSelect = {
  id: true, description: true, amount: true, type: true, transactionDate: true,
  category: { select: { id: true, name: true } },
  user: { select: { id: true, name: true, email: true } },
} satisfies Prisma.TransactionSelect;

function transactionWhere(filters: AdminTransactionFilters): Prisma.TransactionWhereInput {
  return {
    ...(filters.userId ? { userId: filters.userId } : {}),
    ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
    ...(filters.type ? { type: filters.type } : {}),
    ...(filters.search ? { description: { contains: filters.search, mode: "insensitive" } } : {}),
    ...(filters.from || filters.to ? { transactionDate: {
      ...(filters.from ? { gte: new Date(`${filters.from}T00:00:00.000Z`) } : {}),
      ...(filters.to ? { lt: new Date(new Date(`${filters.to}T00:00:00.000Z`).getTime() + 86400000) } : {}),
    } } : {}),
  };
}

/** Global reads are intentionally separate from the owner-scoped repositories. */
export const adminRepository = {
  async users(filters: AdminUsersFilters) {
    const where: Prisma.UserWhereInput = filters.search ? { OR: [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ] } : {};
    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, select: userSelect,
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        skip: (filters.page - 1) * filters.pageSize, take: filters.pageSize }),
      prisma.user.count({ where }),
    ]);
    return { items, total, page: filters.page, pageSize: filters.pageSize };
  },
  user(id: string) {
    return prisma.user.findUnique({ where: { id }, select: userSelect });
  },
  async transactions(filters: AdminTransactionFilters) {
    const where = transactionWhere(filters);
    const [rows, total] = await Promise.all([
      prisma.transaction.findMany({ where, select: transactionSelect,
        orderBy: [{ transactionDate: "desc" }, { id: "asc" }],
        skip: (filters.page - 1) * filters.pageSize, take: filters.pageSize }),
      prisma.transaction.count({ where }),
    ]);
    return { items: rows.map((row) => ({ ...row, amount: row.amount.toFixed(2) })),
      total, page: filters.page, pageSize: filters.pageSize };
  },
  async summary(userId?: string) {
    const where = userId ? { userId } : {};
    const [users, transactions, totals] = await Promise.all([
      prisma.user.count({ where: userId ? { id: userId } : {} }),
      prisma.transaction.count({ where }),
      prisma.transaction.groupBy({ by: ["type"], where, _sum: { amount: true } }),
    ]);
    const income = totals.find((row) => row.type === "INCOME")?._sum.amount ?? new Prisma.Decimal(0);
    const expense = totals.find((row) => row.type === "EXPENSE")?._sum.amount ?? new Prisma.Decimal(0);
    return { users, transactions, income: income.toFixed(2), expense: expense.toFixed(2),
      volume: income.plus(expense).toFixed(2), balance: income.minus(expense).toFixed(2) };
  },
  // Limites calculados em JS a partir do mês civil (fuso de APP_TIME_ZONE,
  // ver src/lib/dates.ts) — não usa now() do Postgres, que reflete o fuso
  // da sessão do banco, não o do usuário.
  async monthlySeries(reference: Date = new Date()) {
    const currentMonthStart = startOfCivilMonth(reference);
    const from = addCivilMonths(currentMonthStart, -11);
    const to = addCivilMonths(currentMonthStart, 1);
    const rows = await prisma.$queryRaw<{ month: Date; type: string; total: Prisma.Decimal }[]>(Prisma.sql`
      SELECT date_trunc('month', "transactionDate") AS month, "type", SUM("amount") AS total
      FROM "Transaction"
      WHERE "transactionDate" >= ${from}
        AND "transactionDate" < ${to}
      GROUP BY 1, 2 ORDER BY 1 ASC
    `);
    const months = new Map<string, { month: string; income: string; expense: string }>();
    for (const row of rows) {
      const month = row.month.toISOString().slice(0, 7);
      const entry = months.get(month) ?? { month, income: "0.00", expense: "0.00" };
      if (row.type === "INCOME") entry.income = row.total.toFixed(2);
      if (row.type === "EXPENSE") entry.expense = row.total.toFixed(2);
      months.set(month, entry);
    }
    return [...months.values()];
  },
};

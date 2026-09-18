import { startOfCivilMonth, endOfCivilMonth } from "@/lib/dates";
import { transactionRepository } from "@/repositories/transaction.repository";
import { categoryRepository } from "@/repositories/category.repository";
import type { DashboardSummary, MonthlyChartPoint } from "@/types";

const CHART_MONTHS = 6;

export const financialService = {
  async getDashboardSummary(
    userId: string,
    reference: Date = new Date(),
  ): Promise<DashboardSummary> {
    const monthStart = startOfCivilMonth(reference);
    const monthEnd = endOfCivilMonth(reference);

    const [
      monthIncome,
      monthExpense,
      balance,
      transactionCount,
      expenseByCategoryRaw,
      categories,
    ] = await Promise.all([
      transactionRepository.sumByType(userId, {
        type: "INCOME",
        from: monthStart,
        to: monthEnd,
      }),
      transactionRepository.sumByType(userId, {
        type: "EXPENSE",
        from: monthStart,
        to: monthEnd,
      }),
      transactionRepository.totalBalance(userId),
      transactionRepository.count(userId),
      transactionRepository.sumByCategory(userId, {
        type: "EXPENSE",
        from: monthStart,
        to: monthEnd,
      }),
      categoryRepository.findAll(userId),
    ]);

    const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));
    const expenseByCategory = expenseByCategoryRaw
      .map((row) => ({
        category: categoryNameById.get(row.categoryId) ?? "Outros",
        total: row.total,
      }))
      .sort((a, b) => b.total - a.total);

    return {
      balance,
      monthIncome,
      monthExpense,
      monthResult: monthIncome - monthExpense,
      transactionCount,
      expenseByCategory,
    };
  },

  /** Séries mensais para os gráficos, com saldo acumulado real (a partir do histórico completo de `userId`). */
  async getMonthlyChartSeries(
    userId: string,
    months: number = CHART_MONTHS,
    reference: Date = new Date(),
  ): Promise<MonthlyChartPoint[]> {
    const series = await transactionRepository.monthlySeries(userId, months, reference);
    if (series.length === 0) return [];

    const firstMonth = new Date(series[0].month);
    let runningBalance = await transactionRepository.balanceBefore(userId, firstMonth);

    return series.map((point) => {
      runningBalance += point.income - point.expense;
      return {
        month: point.month.slice(0, 7),
        income: point.income,
        expense: point.expense,
        balance: runningBalance,
      };
    });
  },
};

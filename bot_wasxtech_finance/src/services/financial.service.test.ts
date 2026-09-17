import { describe, expect, it, vi } from "vitest";

vi.mock("@/repositories/transaction.repository", () => ({
  transactionRepository: {
    sumByType: vi.fn().mockResolvedValue(0),
    totalBalance: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    sumByCategory: vi.fn().mockResolvedValue([]),
    monthlySeries: vi.fn().mockResolvedValue([]),
    balanceBefore: vi.fn().mockResolvedValue(0),
  },
}));

vi.mock("@/repositories/category.repository", () => ({
  categoryRepository: {
    findAll: vi.fn().mockResolvedValue([]),
  },
}));

const { financialService } = await import("./financial.service");

const USER_ID = "user-1";

describe("financialService — banco sem nenhuma transação", () => {
  it("getDashboardSummary retorna tudo zerado", async () => {
    const summary = await financialService.getDashboardSummary(USER_ID, new Date(2026, 8, 16));

    expect(summary.balance).toBe(0);
    expect(summary.monthIncome).toBe(0);
    expect(summary.monthExpense).toBe(0);
    expect(summary.monthResult).toBe(0);
    expect(summary.transactionCount).toBe(0);
    expect(summary.expenseByCategory).toEqual([]);
  });

  it("getMonthlyChartSeries retorna lista vazia (sem quebrar)", async () => {
    const series = await financialService.getMonthlyChartSeries(USER_ID);
    expect(series).toEqual([]);
  });
});

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
const { transactionRepository } = await import("@/repositories/transaction.repository");
const { civilDate } = await import("@/lib/dates");

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

describe("financialService — limites do mês civil (fuso da aplicação)", () => {
  // 23:30 em Campo Grande do último dia de setembro já é 1º de outubro em
  // UTC — o "mês atual" do dashboard tem que continuar sendo setembro
  // para quem está em Campo Grande, não outubro.
  it("no último instante de setembro em Campo Grande, o mês do dashboard ainda é setembro", async () => {
    const lastNightOfSeptemberInCampoGrande = new Date(Date.UTC(2026, 9, 1, 3, 30, 0));
    vi.mocked(transactionRepository.sumByType).mockClear();
    await financialService.getDashboardSummary(USER_ID, lastNightOfSeptemberInCampoGrande);

    expect(transactionRepository.sumByType).toHaveBeenCalledWith(USER_ID, {
      type: "INCOME",
      from: civilDate(2026, 9, 1),
      to: new Date("2026-09-30T23:59:59.999Z"),
    });
  });
});

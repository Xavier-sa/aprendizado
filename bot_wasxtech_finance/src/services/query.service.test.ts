import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/repositories/transaction.repository", () => ({
  transactionRepository: {
    totalBalance: vi.fn().mockResolvedValue(0),
    sumByType: vi.fn().mockResolvedValue(0),
  },
}));
vi.mock("@/repositories/category.repository", () => ({
  categoryRepository: { findAll: vi.fn().mockResolvedValue([]) },
}));

const { queryService } = await import("./query.service");
const { transactionRepository } = await import("@/repositories/transaction.repository");
const { civilDate } = await import("@/lib/dates");

const USER_ID = "user-1";

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(transactionRepository.sumByType).mockResolvedValue(0);
});

describe("queryService — 'hoje' respeita a virada do dia em Campo Grande", () => {
  // 23:30 em Campo Grande (UTC-4) já é madrugada do dia seguinte em UTC.
  // "Quanto gastei hoje?" perguntado nesse instante tem que somar o dia
  // civil que ainda está em curso em Campo Grande, não o de UTC.
  it("'quanto gastei hoje' soma o dia civil de Campo Grande, não o de UTC", async () => {
    const lateEveningInCampoGrande = new Date(Date.UTC(2026, 8, 19, 3, 30, 0)); // 18/09 23:30 -04:00

    await queryService.answer(USER_ID, "quanto gastei hoje?", lateEveningInCampoGrande);

    expect(transactionRepository.sumByType).toHaveBeenCalledWith(USER_ID, {
      type: "EXPENSE",
      from: civilDate(2026, 9, 18),
      to: new Date("2026-09-18T23:59:59.999Z"),
    });
  });
});

describe("queryService — 'este mês' respeita o mês civil de Campo Grande", () => {
  it("na última noite do mês em Campo Grande, 'este mês' ainda é o mês corrente", async () => {
    const lastNightOfSeptemberInCampoGrande = new Date(Date.UTC(2026, 9, 1, 3, 30, 0)); // 30/09 23:30 -04:00

    await queryService.answer(USER_ID, "quanto recebi este mês?", lastNightOfSeptemberInCampoGrande);

    expect(transactionRepository.sumByType).toHaveBeenCalledWith(USER_ID, {
      type: "INCOME",
      from: civilDate(2026, 9, 1),
      to: new Date("2026-09-30T23:59:59.999Z"),
    });
  });
});

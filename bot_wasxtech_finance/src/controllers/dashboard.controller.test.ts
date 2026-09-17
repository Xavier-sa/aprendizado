import { describe, expect, it, vi, beforeEach } from "vitest";

const getUserIdMock = vi.fn();
const financialServiceMock = {
  getDashboardSummary: vi.fn().mockResolvedValue({ balance: 100 }),
  getMonthlyChartSeries: vi.fn().mockResolvedValue([]),
};

vi.mock("@/lib/session", () => ({ getUserId: getUserIdMock }));
vi.mock("@/services/financial.service", () => ({ financialService: financialServiceMock }));

const { dashboardController } = await import("./dashboard.controller");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("dashboardController — sem sessão", () => {
  it("retorna 401 e nunca chama o financialService quando não há usuário autenticado", async () => {
    getUserIdMock.mockResolvedValue(null);

    const response = await dashboardController.get(new Request("http://localhost/api/dashboard"));

    expect(response.status).toBe(401);
    expect(financialServiceMock.getDashboardSummary).not.toHaveBeenCalled();
    expect(financialServiceMock.getMonthlyChartSeries).not.toHaveBeenCalled();
  });

  it("com sessão válida, consulta o financialService com o userId da sessão", async () => {
    getUserIdMock.mockResolvedValue("user-1");

    const response = await dashboardController.get(new Request("http://localhost/api/dashboard"));

    expect(response.status).toBe(200);
    expect(financialServiceMock.getDashboardSummary).toHaveBeenCalledWith("user-1");
  });
});

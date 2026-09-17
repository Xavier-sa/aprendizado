import { NextResponse } from "next/server";
import { financialService } from "@/services/financial.service";
import { getUserId } from "@/lib/session";

export const dashboardController = {
  async get(request: Request) {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    const [summary, series] = await Promise.all([
      financialService.getDashboardSummary(userId),
      financialService.getMonthlyChartSeries(userId),
    ]);
    return NextResponse.json({ summary, series });
  },
};

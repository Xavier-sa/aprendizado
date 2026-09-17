import { NextResponse } from "next/server";
import { financialService } from "@/services/financial.service";

export const dashboardController = {
  async get() {
    const [summary, series] = await Promise.all([
      financialService.getDashboardSummary(),
      financialService.getMonthlyChartSeries(),
    ]);
    return NextResponse.json({ summary, series });
  },
};

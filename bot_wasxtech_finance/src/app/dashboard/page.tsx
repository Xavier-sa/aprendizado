import { financialService } from "@/services/financial.service";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { Card, CardTitle } from "@/components/ui/Card";
import { IncomeExpenseChart } from "@/components/charts/IncomeExpenseChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { BalanceEvolutionChart } from "@/components/charts/BalanceEvolutionChart";
import { MonthlySpendChart } from "@/components/charts/MonthlySpendChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [summary, series] = await Promise.all([
    financialService.getDashboardSummary(),
    financialService.getMonthlyChartSeries(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-muted">Visão geral das suas finanças.</p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Receitas x despesas por mês</CardTitle>
          <div className="mt-4">
            <IncomeExpenseChart data={series} />
          </div>
        </Card>

        <Card>
          <CardTitle>Despesas por categoria (mês atual)</CardTitle>
          <div className="mt-4">
            <CategoryPieChart data={summary.expenseByCategory} />
          </div>
        </Card>

        <Card>
          <CardTitle>Evolução do saldo</CardTitle>
          <div className="mt-4">
            <BalanceEvolutionChart data={series} />
          </div>
        </Card>

        <Card>
          <CardTitle>Evolução mensal dos gastos</CardTitle>
          <div className="mt-4">
            <MonthlySpendChart data={series} />
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>Detalhamento por categoria</CardTitle>
        <div className="mt-4">
          <CategoryBreakdown data={summary.expenseByCategory} />
        </div>
      </Card>
    </div>
  );
}

import { Card, CardTitle } from "@/components/ui/Card";
import { formatCurrencyBRL } from "@/lib/currency";
import type { DashboardSummary } from "@/types";

export function SummaryCards({ summary }: { summary: DashboardSummary }) {
  const items = [
    { label: "Saldo", value: summary.balance, tone: "text-text-primary" },
    { label: "Receitas do mês", value: summary.monthIncome, tone: "text-income" },
    { label: "Despesas do mês", value: summary.monthExpense, tone: "text-expense" },
    {
      label: "Resultado mensal",
      value: summary.monthResult,
      tone: summary.monthResult >= 0 ? "text-income" : "text-expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <CardTitle>{item.label}</CardTitle>
          <p className={`mt-2 text-2xl font-semibold ${item.tone}`}>
            {formatCurrencyBRL(item.value)}
          </p>
        </Card>
      ))}
      <Card>
        <CardTitle>Movimentações</CardTitle>
        <p className="mt-2 text-2xl font-semibold text-text-primary">
          {summary.transactionCount}
        </p>
      </Card>
    </div>
  );
}

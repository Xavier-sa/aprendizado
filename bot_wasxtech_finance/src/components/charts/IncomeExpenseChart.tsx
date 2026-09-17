"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyChartPoint } from "@/types";
import { formatCurrencyBRL } from "@/lib/currency";
import { formatMonthLabel } from "@/lib/dates";
import { EmptyChartState } from "./EmptyChartState";

export function IncomeExpenseChart({ data }: { data: MonthlyChartPoint[] }) {
  if (data.length === 0) {
    return (
      <EmptyChartState message="Ainda não há movimentações suficientes para gerar este gráfico." />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            tickFormatter={formatMonthLabel}
            stroke="var(--color-text-muted)"
            fontSize={12}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            fontSize={12}
            tickFormatter={(value: number) => formatCurrencyBRL(value)}
            width={80}
          />
          <Tooltip
            formatter={(value) => formatCurrencyBRL(Number(value ?? 0))}
            labelFormatter={(label) => formatMonthLabel(String(label ?? ""))}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              color: "var(--color-text-primary)",
            }}
          />
          <Legend />
          <Bar dataKey="income" name="Receitas" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Despesas" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

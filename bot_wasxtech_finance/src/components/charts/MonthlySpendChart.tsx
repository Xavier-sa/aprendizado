"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyChartPoint } from "@/types";
import { formatCurrencyBRL } from "@/lib/currency";
import { formatMonthLabel } from "@/lib/dates";
import { EmptyChartState } from "./EmptyChartState";
import { CHART_TOOLTIP } from "./chartTheme";

export function MonthlySpendChart({ data }: { data: MonthlyChartPoint[] }) {
  if (data.length === 0) {
    return (
      <EmptyChartState message="Ainda não há movimentações suficientes para gerar este gráfico." />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-grid)" />
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
            {...CHART_TOOLTIP}
          />
          <Area
            type="monotone"
            dataKey="expense"
            name="Gastos"
            stroke="var(--color-chart-expense)"
            fill="var(--color-chart-expense)"
            fillOpacity={0.18}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

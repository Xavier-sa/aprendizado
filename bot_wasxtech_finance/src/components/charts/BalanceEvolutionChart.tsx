"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
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

export function BalanceEvolutionChart({ data }: { data: MonthlyChartPoint[] }) {
  if (data.length === 0) {
    return (
      <EmptyChartState message="Registre sua primeira movimentação para começar a acompanhar sua evolução." />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
          <Line
            type="monotone"
            dataKey="balance"
            name="Saldo"
            stroke="var(--color-chart-balance)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

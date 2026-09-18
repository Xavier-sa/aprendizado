"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrencyBRL } from "@/lib/currency";
import { EmptyChartState } from "./EmptyChartState";
import { CHART_CATEGORY_COLORS, CHART_TOOLTIP, chartLegendLabel } from "./chartTheme";

interface CategoryPieChartProps {
  data: { category: string; total: number }[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (data.length === 0) {
    return (
      <EmptyChartState message="Ainda não há movimentações suficientes para gerar este gráfico." />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius="45%"
            outerRadius="75%"
            paddingAngle={2}
            stroke="var(--color-surface)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={CHART_CATEGORY_COLORS[index % CHART_CATEGORY_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrencyBRL(Number(value ?? 0))}
            {...CHART_TOOLTIP}
          />
          <Legend formatter={chartLegendLabel} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

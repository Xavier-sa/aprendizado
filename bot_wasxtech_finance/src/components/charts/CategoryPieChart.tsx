"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrencyBRL } from "@/lib/currency";
import { EmptyChartState } from "./EmptyChartState";

// Paleta categórica dentro da identidade visual (tons terrosos/bronze),
// usada apenas aqui para distinguir categorias no gráfico.
const CATEGORY_COLORS = [
  "#a9782e",
  "#9c4b2e",
  "#6b8e4e",
  "#3f6b3a",
  "#c99a46",
  "#8c6423",
  "#7a6a52",
  "#b5824a",
  "#5f7a6b",
  "#8a5a3a",
];

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
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrencyBRL(Number(value ?? 0))}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              color: "var(--color-text-primary)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

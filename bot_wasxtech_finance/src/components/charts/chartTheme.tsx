/** CSS variables resolve inside the current user's palette, including previews. */
export const CHART_CATEGORY_COLORS = Array.from({ length: 8 }, (_, index) => `var(--color-chart-${index + 1})`);
export const CHART_TOOLTIP = {
  contentStyle: {
    background: "var(--color-tooltip-background)",
    border: "1px solid var(--color-tooltip-border)",
    borderRadius: 8,
    color: "var(--color-tooltip-foreground)",
  },
  itemStyle: { color: "var(--color-tooltip-foreground)" },
  labelStyle: { color: "var(--color-tooltip-foreground)" },
  cursor: { fill: "var(--color-surface-secondary)", stroke: "var(--color-control-border)" },
};
export function chartLegendLabel(value: unknown) {
  return <span className="text-text-primary">{String(value)}</span>;
}

import { formatCurrencyBRL } from "@/lib/currency";

interface CategoryBreakdownProps {
  data: { category: string; total: number }[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-text-muted">
        Registre sua primeira movimentação para começar a acompanhar sua evolução.
      </p>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <ul className="flex flex-col gap-2">
      {data.map((item) => (
        <li key={item.category} className="flex items-center justify-between text-sm">
          <span className="text-text-primary">{item.category}</span>
          <span className="flex items-center gap-2 text-text-muted">
            <span>{total > 0 ? Math.round((item.total / total) * 100) : 0}%</span>
            <span className="font-medium text-text-primary">
              {formatCurrencyBRL(item.total)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

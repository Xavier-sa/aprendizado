import type { TransactionType } from "@/types";

export function TypeBadge({ type }: { type: TransactionType }) {
  const isIncome = type === "INCOME";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        isIncome
          ? "bg-income/15 text-income"
          : "bg-expense/15 text-expense"
      }`}
    >
      {isIncome ? "Receita" : "Despesa"}
    </span>
  );
}

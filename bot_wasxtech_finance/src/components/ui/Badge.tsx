import type { TransactionType } from "@/types";

export function TypeBadge({ type }: { type: TransactionType }) {
  const isIncome = type === "INCOME";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        isIncome
          ? "bg-income-soft text-income"
          : "bg-expense-soft text-expense"
      }`}
    >
      {isIncome ? "Receita" : "Despesa"}
    </span>
  );
}

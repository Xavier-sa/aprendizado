import { Button } from "@/components/ui/Button";
import { TypeBadge } from "@/components/ui/Badge";
import { formatCurrencyBRL } from "@/lib/currency";
import { formatRelativeDateLabel } from "@/lib/dates";
import type { ChatDraft } from "@/types";

interface TransactionPreviewProps {
  draft: ChatDraft;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export function TransactionPreview({
  draft,
  onConfirm,
  onCancel,
  disabled,
}: TransactionPreviewProps) {
  if (!draft.type) return null;

  const isIncome = draft.type === "INCOME";
  const description = draft.description || draft.categoryName || "Movimentação";
  const dateLabel = formatRelativeDateLabel(new Date(draft.transactionDate));

  return (
    <div
      className={`mt-1 w-full max-w-sm rounded-lg border p-4 ${
        isIncome ? "border-income/30 bg-income/5" : "border-expense/30 bg-expense/5"
      }`}
    >
      <TypeBadge type={draft.type} />

      <p className="mt-2 text-sm text-text-primary">{description}</p>
      <p
        className={`text-xl font-semibold ${isIncome ? "text-income" : "text-expense"}`}
      >
        {formatCurrencyBRL(draft.amount ?? 0)}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-text-muted">Categoria</p>
          <p className="text-text-primary">{draft.categoryName ?? "—"}</p>
        </div>
        <div>
          <p className="text-text-muted">Data</p>
          <p className="text-text-primary">{dateLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="primary" onClick={onConfirm} disabled={disabled}>
          Confirmar
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={disabled}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/Button";
import type { DeleteCandidate } from "@/types";

export function ConfirmActions({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="ml-0 mt-1 flex gap-2 sm:ml-2">
      <Button variant="primary" onClick={onConfirm}>
        Confirmar
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  );
}

export function DisambiguateOptions({
  candidates,
  onPick,
}: {
  candidates: DeleteCandidate[];
  onPick: (index: number) => void;
}) {
  return (
    <div className="mt-1 flex flex-col gap-1">
      {candidates.map((candidate, index) => (
        <button
          key={candidate.id}
          onClick={() => onPick(index + 1)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary"
        >
          {index + 1}. {candidate.label}
        </button>
      ))}
    </div>
  );
}

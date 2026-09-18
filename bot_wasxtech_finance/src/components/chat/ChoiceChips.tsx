export interface Choice {
  key: string;
  label: string;
  onClick: () => void;
  /** Destaca a escolha como sugestão (chip com ✓, cor de destaque). */
  primary?: boolean;
}

interface ChoiceChipsProps {
  choices: Choice[];
  /** Rótulo mostrado acima das opções não-destacadas, ex.: "Ou escolha outra:". */
  note?: string;
}

/**
 * Linha de chips clicáveis, reaproveitada para: escolha de tipo
 * (Receita/Despesa), opções de categoria (com sugestão destacada) e
 * quick actions. Cada clique só dispara `onClick` — quem chama decide o
 * que enviar ao chat.
 */
export function ChoiceChips({ choices, note }: ChoiceChipsProps) {
  const primary = choices.filter((c) => c.primary);
  const rest = choices.filter((c) => !c.primary);

  return (
    <div className="mt-1 flex flex-col gap-2">
      {primary.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {primary.map((choice) => (
            <button
              key={choice.key}
              onClick={choice.onClick}
              className="rounded-full border border-accent bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              ✓ {choice.label}
            </button>
          ))}
        </div>
      )}

      {note && rest.length > 0 && (
        <p className="text-xs text-text-muted">{note}</p>
      )}

      {rest.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {rest.map((choice) => (
            <button
              key={choice.key}
              onClick={choice.onClick}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface-secondary"
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

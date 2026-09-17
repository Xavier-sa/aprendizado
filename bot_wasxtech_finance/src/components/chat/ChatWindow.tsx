"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MessageBubble } from "./MessageBubble";
import { DisambiguateOptions } from "./ConfirmationCard";
import { TransactionPreview } from "./TransactionPreview";
import { ChoiceChips, type Choice } from "./ChoiceChips";
import { Input } from "@/components/ui/Input";
import type {
  CategoryDTO,
  CategorySuggestion,
  ChatContext,
  ChatDraft,
  ChatResponseBody,
  DeleteCandidate,
} from "@/types";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  draft?: ChatDraft;
  showPreview?: boolean;
  typeChoice?: boolean;
  categoryChoice?: {
    draft: ChatDraft;
    options: CategoryDTO[];
    suggested?: CategorySuggestion | null;
  };
  candidates?: DeleteCandidate[];
  unknown?: boolean;
}

const EXAMPLES = [
  "Gastei 50 reais no mercado hoje",
  "Recebi 200 reais",
  "Qual meu saldo?",
  "Quanto gastei este mês?",
];

function clearInteractive(messages: ChatMessage[]): ChatMessage[] {
  return messages.map((m) => ({
    ...m,
    showPreview: false,
    typeChoice: false,
    categoryChoice: undefined,
    candidates: undefined,
    unknown: false,
  }));
}

function CategoryChoiceChips({
  choice,
  onPick,
  onNewCategory,
}: {
  choice: NonNullable<ChatMessage["categoryChoice"]>;
  onPick: (categoryName: string) => void;
  onNewCategory: (draft: ChatDraft) => void;
}) {
  const { draft, options, suggested } = choice;

  const choices: Choice[] = [];
  if (suggested) {
    choices.push({
      key: suggested.id,
      label: suggested.name,
      primary: true,
      onClick: () => onPick(suggested.name),
    });
  }
  for (const category of options) {
    if (category.id === suggested?.id) continue;
    choices.push({
      key: category.id,
      label: category.name,
      onClick: () => onPick(category.name),
    });
  }
  choices.push({
    key: "new-category",
    label: "+ Nova categoria",
    onClick: () => onNewCategory(draft),
  });

  return <ChoiceChips note="Ou escolha outra:" choices={choices} />;
}

export function ChatWindow() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>({ kind: "none" });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(message: string) {
    if (!message.trim() || loading) return;

    setMessages((prev) => [
      ...clearInteractive(prev),
      { id: crypto.randomUUID(), role: "user", text: message },
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context }),
      });
      const data: ChatResponseBody = await response.json();

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        text: data.text,
      };

      if (data.type === "confirm") {
        setContext({ kind: "confirm_create", draft: data.draft });
        botMessage.draft = data.draft;
        botMessage.showPreview = true;
      } else if (data.type === "clarify") {
        setContext({ kind: "clarify", draft: data.draft, missing: data.missing });
        if (data.missing[0] === "type") {
          botMessage.typeChoice = true;
        } else if (data.missing[0] === "category") {
          botMessage.categoryChoice = {
            draft: data.draft,
            options: data.categoryOptions ?? [],
            suggested: data.suggestedCategory ?? null,
          };
        }
      } else if (data.type === "disambiguate") {
        setContext({ kind: "disambiguate_delete", candidates: data.candidates });
        botMessage.candidates = data.candidates;
      } else if (data.type === "unknown") {
        setContext({ kind: "none" });
        botMessage.unknown = true;
      } else {
        setContext({ kind: "none" });
      }

      setMessages((prev) => [...prev, botMessage]);

      if (data.type === "created" || data.type === "updated" || data.type === "deleted") {
        router.refresh();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Não consegui falar com o servidor. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function askNewCategoryName(draft: ChatDraft) {
    setMessages((prev) => [
      ...clearInteractive(prev),
      {
        id: crypto.randomUUID(),
        role: "bot",
        text: "Qual o nome da nova categoria?",
      },
    ]);
    setContext({ kind: "awaiting_new_category_name", draft });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  const quickActions: Choice[] = [
    { key: "expense", label: "+ Despesa", onClick: () => send("despesa") },
    { key: "income", label: "+ Receita", onClick: () => send("receita") },
    { key: "balance", label: "Consultar saldo", onClick: () => send("Qual meu saldo?") },
  ];

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col md:h-[calc(100vh-3rem)]">
      <div className="mb-3">
        <ChoiceChips choices={quickActions} />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-border bg-background p-3 sm:p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-sm text-text-muted">Experimente escrever:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  onClick={() => send(example)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface-secondary"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          return (
            <div key={message.id} className="flex flex-col gap-1">
              <MessageBubble role={message.role} text={message.text} />

              {message.showPreview && message.draft && isLast && (
                <TransactionPreview
                  draft={message.draft}
                  disabled={loading}
                  onConfirm={() => send("sim")}
                  onCancel={() => send("não")}
                />
              )}

              {message.typeChoice && isLast && (
                <ChoiceChips
                  choices={[
                    { key: "income", label: "Receita", onClick: () => send("receita") },
                    { key: "expense", label: "Despesa", onClick: () => send("despesa") },
                  ]}
                />
              )}

              {message.categoryChoice && isLast && (
                <CategoryChoiceChips
                  choice={message.categoryChoice}
                  onPick={send}
                  onNewCategory={askNewCategoryName}
                />
              )}

              {message.candidates && isLast && (
                <DisambiguateOptions
                  candidates={message.candidates}
                  onPick={(index) => send(String(index))}
                />
              )}

              {message.unknown && isLast && (
                <ChoiceChips
                  choices={[
                    { key: "expense", label: "Registrar despesa", onClick: () => send("despesa") },
                    { key: "income", label: "Registrar receita", onClick: () => send("receita") },
                    { key: "balance", label: "Consultar saldo", onClick: () => send("Qual meu saldo?") },
                  ]}
                />
              )}
            </div>
          );
        })}
        {loading && (
          <p className="text-xs text-text-muted">FinanceBot está digitando…</p>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma movimentação ou pergunta..."
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Enviar"
          className="flex items-center justify-center rounded-md bg-accent px-4 text-surface transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

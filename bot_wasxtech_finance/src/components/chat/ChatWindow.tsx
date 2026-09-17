"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MessageBubble } from "./MessageBubble";
import { ConfirmActions, DisambiguateOptions } from "./ConfirmationCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ChatContext, ChatResponseBody, DeleteCandidate } from "@/types";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  awaitingConfirm?: boolean;
  candidates?: DeleteCandidate[];
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: 'Descreva uma movimentação (ex.: "Gastei 187,43 no mercado hoje") ou pergunte algo (ex.: "Qual meu saldo?").',
};

export function ChatWindow() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [context, setContext] = useState<ChatContext>({ kind: "none" });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(message: string) {
    if (!message.trim() || loading) return;

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, awaitingConfirm: false, candidates: undefined })),
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
        botMessage.awaitingConfirm = true;
      } else if (data.type === "clarify") {
        setContext({ kind: "clarify", draft: data.draft, missing: data.missing });
      } else if (data.type === "disambiguate") {
        setContext({ kind: "disambiguate_delete", candidates: data.candidates });
        botMessage.candidates = data.candidates;
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col md:h-[calc(100vh-3rem)]">
      <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-border bg-background p-3 sm:p-4">
        {messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          return (
            <div key={message.id} className="flex flex-col gap-1">
              <MessageBubble role={message.role} text={message.text} />
              {message.awaitingConfirm && isLast && (
                <ConfirmActions onConfirm={() => send("sim")} onCancel={() => send("não")} />
              )}
              {message.candidates && isLast && (
                <DisambiguateOptions
                  candidates={message.candidates}
                  onPick={(index) => send(String(index))}
                />
              )}
            </div>
          );
        })}
        {loading && (
          <p className="text-xs text-text-muted">FinanceBot está digitando…</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva sua mensagem..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          Enviar
        </Button>
      </form>
    </div>
  );
}

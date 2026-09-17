import { NextResponse } from "next/server";
import { chatMessageSchema } from "@/schemas/transaction.schema";
import { parseMessage, detectAmount } from "@/services/parser.service";
import { queryService } from "@/services/query.service";
import { transactionService } from "@/services/transaction.service";
import { transactionRepository } from "@/repositories/transaction.repository";
import { categoryRepository } from "@/repositories/category.repository";
import { parseNaturalDate, formatDateBR } from "@/lib/dates";
import { formatCurrencyBRL } from "@/lib/currency";
import type {
  ChatContext,
  ChatDraft,
  ChatRequestBody,
  ChatResponseBody,
  MissingField,
} from "@/types";

const AFFIRMATIVE = /^(sim|s|confirmar|confirmo|ok|pode registrar|yes)\b/i;
const NEGATIVE = /^(n[aã]o|n|cancelar|cancela)\b/i;

function draftPreviewText(draft: ChatDraft) {
  const typeLabel = draft.type === "INCOME" ? "Receita" : "Despesa";
  const dateLabel = formatDateBR(new Date(draft.transactionDate));
  return (
    `Entendi:\n\n${draft.categoryName}\n${formatCurrencyBRL(draft.amount ?? 0)}\n${dateLabel}\n(${typeLabel})\n\n` +
    `Deseja registrar?`
  );
}

function missingQuestion(missing: MissingField[]): string {
  if (missing.includes("type")) return "Isso foi uma receita ou uma despesa?";
  if (missing.includes("amount")) return "Qual o valor dessa movimentação?";
  if (missing.includes("category"))
    return "Em qual categoria deseja registrar essa movimentação?";
  return "Pode confirmar os dados?";
}

async function buildDraft(
  message: string,
  previous?: ChatDraft,
): Promise<{ draft: ChatDraft; missing: MissingField[] }> {
  const categories = await categoryRepository.findAll();
  const parsed = parseMessage(message, categories);

  const trimmedLower = message.trim().toLowerCase();
  let type = parsed.type ?? previous?.type ?? null;
  if (!type) {
    if (trimmedLower === "despesa") type = "EXPENSE";
    if (trimmedLower === "receita") type = "INCOME";
  }

  const amount = parsed.amount ?? previous?.amount ?? null;

  let categoryId = parsed.categoryId ?? previous?.categoryId ?? null;
  let categoryName = parsed.categoryName ?? previous?.categoryName ?? null;

  if (!categoryId) {
    const direct = categories.find(
      (c) =>
        c.name.toLowerCase() === trimmedLower && (!type || c.type === type),
    );
    if (direct) {
      categoryId = direct.id;
      categoryName = direct.name;
    }
  }

  const transactionDate = previous
    ? new Date(previous.transactionDate)
    : parsed.transactionDate;

  const missing: MissingField[] = [];
  if (!type) missing.push("type");
  if (amount === null) missing.push("amount");
  if (!categoryId) missing.push("category");

  const draft: ChatDraft = {
    type,
    amount,
    categoryId,
    categoryName,
    transactionDate: transactionDate.toISOString(),
    originalMessage: previous
      ? `${previous.originalMessage} ${message}`.trim()
      : message,
  };

  return { draft, missing };
}

async function tryHandleEditCommands(
  message: string,
): Promise<ChatResponseBody | null> {
  const lower = message.toLowerCase();

  if (/apague.*últi?mo lan[çc]amento|apagar.*últi?mo lan[çc]amento/i.test(lower)) {
    const last = await transactionRepository.findLast();
    if (!last) {
      return { type: "info", text: "Não encontrei nenhum lançamento para apagar." };
    }
    await transactionService.remove(last.id);
    return {
      type: "deleted",
      text: `Lançamento "${last.description}" (${formatCurrencyBRL(Number(last.amount))}) excluído.`,
    };
  }

  const amountFix = lower.match(/na verdade (?:foram|foi|é|eh)\s+([\d.,]+)/i);
  if (amountFix) {
    const amount = detectAmount(amountFix[1]);
    if (amount === null) return { type: "info", text: "Não entendi o novo valor." };
    const last = await transactionRepository.findLast();
    if (!last) {
      return { type: "info", text: "Não encontrei nenhum lançamento recente para corrigir." };
    }
    const transaction = await transactionService.update(last.id, { amount });
    return {
      type: "updated",
      text: `Valor atualizado para ${formatCurrencyBRL(amount)}.`,
      transaction,
    };
  }

  const categoryFix =
    lower.match(/mude (?:a categoria )?para\s+(.+)/i) ??
    lower.match(/troque a categoria para\s+(.+)/i);
  if (categoryFix) {
    const last = await transactionRepository.findLast();
    if (!last) {
      return { type: "info", text: "Não encontrei nenhum lançamento recente para corrigir." };
    }
    const categories = await categoryRepository.findByType(last.type);
    const wanted = categoryFix[1].trim();
    const target = categories.find((c) => wanted.includes(c.name.toLowerCase()));
    if (!target) {
      return { type: "info", text: `Não encontrei a categoria "${wanted}".` };
    }
    const transaction = await transactionService.update(last.id, {
      categoryId: target.id,
    });
    return {
      type: "updated",
      text: `Categoria atualizada para ${target.name}.`,
      transaction,
    };
  }

  const dateFix =
    lower.match(/coloque a data como\s+(.+)/i) ??
    lower.match(/mude a data para\s+(.+)/i);
  if (dateFix) {
    const last = await transactionRepository.findLast();
    if (!last) {
      return { type: "info", text: "Não encontrei nenhum lançamento recente para corrigir." };
    }
    const date = parseNaturalDate(dateFix[1]);
    if (!date) return { type: "info", text: "Não entendi a nova data." };
    const transaction = await transactionService.update(last.id, {
      transactionDate: date,
    });
    return {
      type: "updated",
      text: `Data atualizada para ${formatDateBR(date)}.`,
      transaction,
    };
  }

  const deleteByCategory = lower.match(/^apague\s+(?:o|a|os|as)?\s*(.+)/i);
  if (deleteByCategory) {
    const keyword = deleteByCategory[1].trim();
    const categories = await categoryRepository.findAll();
    const target = categories.find((c) => keyword.includes(c.name.toLowerCase()));
    if (!target) return null;

    const candidates = await transactionRepository.findMany({
      categoryId: target.id,
    });
    if (candidates.length === 0) {
      return { type: "info", text: `Não encontrei lançamentos de ${target.name}.` };
    }
    if (candidates.length === 1) {
      await transactionService.remove(candidates[0].id);
      return { type: "deleted", text: `Lançamento de ${target.name} excluído.` };
    }
    const options = candidates.slice(0, 10).map((t) => ({
      id: t.id,
      label: `${formatDateBR(t.transactionDate)} — ${t.description} — ${formatCurrencyBRL(Number(t.amount))}`,
    }));
    return {
      type: "disambiguate",
      text: `Encontrei ${candidates.length} lançamentos de ${target.name}. Qual deles deseja excluir? Responda com o número.`,
      candidates: options,
    };
  }

  return null;
}

export async function handleChat(
  body: ChatRequestBody,
): Promise<ChatResponseBody> {
  const parsedBody = chatMessageSchema.safeParse({ message: body.message });
  if (!parsedBody.success) {
    return { type: "info", text: "Não entendi. Pode reescrever a mensagem?" };
  }
  const message = parsedBody.data.message;
  const context: ChatContext = body.context ?? { kind: "none" };
  const trimmed = message.trim();

  if (context.kind === "confirm_create") {
    if (AFFIRMATIVE.test(trimmed)) {
      const { draft } = context;
      if (!draft.type || draft.amount === null || !draft.categoryId) {
        return {
          type: "info",
          text: "Faltam dados para registrar. Vamos tentar de novo — descreva a movimentação.",
        };
      }
      const transaction = await transactionService.create({
        description: draft.categoryName ?? "Movimentação",
        amount: draft.amount,
        type: draft.type,
        categoryId: draft.categoryId,
        transactionDate: new Date(draft.transactionDate),
        originalMessage: draft.originalMessage,
      });
      return {
        type: "created",
        text: `${draft.type === "INCOME" ? "Receita" : "Despesa"} registrada com sucesso.`,
        transaction,
      };
    }
    if (NEGATIVE.test(trimmed)) {
      return { type: "cancelled", text: "Ok, não registrei essa movimentação." };
    }
    // mensagem não foi sim/não: continua o fluxo normal abaixo
  }

  if (context.kind === "disambiguate_delete") {
    const index = Number(trimmed);
    if (Number.isInteger(index) && index >= 1 && index <= context.candidates.length) {
      const candidate = context.candidates[index - 1];
      await transactionService.remove(candidate.id);
      return { type: "deleted", text: `Lançamento "${candidate.label}" excluído.` };
    }
    return {
      type: "info",
      text: "Não entendi a escolha. Responda com o número do lançamento que deseja excluir.",
    };
  }

  const editResult = await tryHandleEditCommands(message);
  if (editResult) return editResult;

  const queryResult = await queryService.answer(message);
  if (queryResult) {
    return { type: "answer", text: queryResult.answer };
  }

  const previousDraft = context.kind === "clarify" ? context.draft : undefined;
  const { draft, missing } = await buildDraft(message, previousDraft);

  if (missing.length > 0) {
    return { type: "clarify", text: missingQuestion(missing), missing, draft };
  }

  return { type: "confirm", text: draftPreviewText(draft), draft };
}

export const chatController = {
  async post(request: Request) {
    const body = (await request.json()) as ChatRequestBody;
    try {
      const response = await handleChat(body);
      return NextResponse.json(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado";
      return NextResponse.json({ type: "info", text: message } satisfies ChatResponseBody, {
        status: 400,
      });
    }
  },
};

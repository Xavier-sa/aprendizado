import { NextResponse } from "next/server";
import { chatMessageSchema } from "@/schemas/transaction.schema";
import {
  detectAmount,
  hasTransactionKeyword,
  parseMessage,
} from "@/services/parser.service";
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
const CANCEL_PATTERN =
  /^(n[aã]o|n|cancelar|cancela|esquece|esquec[eê]|deixa pra l[áa]|volta|voltar)\b/i;

function resolveDescription(draft: ChatDraft): string {
  return draft.description || draft.categoryName || "Movimentação";
}

function draftPreviewText(draft: ChatDraft): string {
  const typeLabel = draft.type === "INCOME" ? "Receita" : "Despesa";
  return `${typeLabel} de ${formatCurrencyBRL(draft.amount ?? 0)} — confira os detalhes e confirme.`;
}

function missingQuestion(missing: MissingField[], draft: ChatDraft): string {
  if (missing.includes("type")) {
    if (draft.amount !== null) {
      return `Esses ${formatCurrencyBRL(draft.amount)} foram uma receita ou uma despesa?`;
    }
    return "Isso foi uma receita ou uma despesa?";
  }
  if (missing.includes("amount")) return "Qual o valor dessa movimentação?";
  if (missing.includes("category")) {
    const kind = draft.type === "INCOME" ? "esta receita" : "esta despesa";
    return `Não consegui identificar a categoria.\nOnde deseja registrar ${kind}?`;
  }
  return "Pode confirmar os dados?";
}

async function buildClarifyResponse(
  draft: ChatDraft,
  missing: MissingField[],
): Promise<ChatResponseBody> {
  const text = missingQuestion(missing, draft);

  if (missing[0] === "category" && draft.type) {
    const categoryOptions = await categoryRepository.findByType(draft.type);
    return {
      type: "clarify",
      text,
      missing,
      draft,
      categoryOptions,
      suggestedCategory: draft.suggestedCategory ?? null,
    };
  }

  return { type: "clarify", text, missing, draft };
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
  let suggestedCategory =
    parsed.suggestedCategory ?? previous?.suggestedCategory ?? null;

  if (!categoryId) {
    const direct = categories.find(
      (c) =>
        c.name.toLowerCase() === trimmedLower && (!type || c.type === type),
    );
    if (direct) {
      categoryId = direct.id;
      categoryName = direct.name;
      suggestedCategory = null;
    }
  }

  const description = previous?.description || parsed.description || "";

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
    suggestedCategory,
    description,
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

const UNKNOWN_RESPONSE: ChatResponseBody = {
  type: "unknown",
  text: "Não entendi se você quer registrar uma movimentação ou consultar suas finanças.",
};

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
        description: resolveDescription(draft),
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
    if (CANCEL_PATTERN.test(trimmed)) {
      return { type: "cancelled", text: "Ok, não registrei essa movimentação." };
    }
    // não foi nem "sim" nem "não": segue o fluxo normal abaixo (pode ser
    // consulta, comando de edição ou uma tentativa de nova movimentação).
  }

  if (context.kind === "disambiguate_delete") {
    if (CANCEL_PATTERN.test(trimmed)) {
      return { type: "cancelled", text: "Ok, cancelei a exclusão." };
    }
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

  if (context.kind === "awaiting_new_category_name") {
    if (CANCEL_PATTERN.test(trimmed)) {
      return buildClarifyResponse(context.draft, ["category"]);
    }
    if (!trimmed || !context.draft.type) {
      return { type: "info", text: "Digite um nome para a nova categoria." };
    }
    let category = await categoryRepository.findByName(trimmed, context.draft.type);
    if (!category) {
      category = await categoryRepository.create({
        name: trimmed,
        type: context.draft.type,
      });
    }
    const draft: ChatDraft = {
      ...context.draft,
      categoryId: category.id,
      categoryName: category.name,
      suggestedCategory: null,
    };
    return { type: "confirm", text: draftPreviewText(draft), draft };
  }

  // Cancelar em qualquer pergunta pendente — evita repetir a mesma
  // pergunta quando a resposta não é reconhecida (ver docs/decisions.md).
  if (context.kind === "clarify" && CANCEL_PATTERN.test(trimmed)) {
    return { type: "cancelled", text: "Ok, cancelei esse registro." };
  }

  const editResult = await tryHandleEditCommands(message);
  if (editResult) return editResult;

  const queryResult = await queryService.answer(message);
  if (queryResult) {
    return { type: "answer", text: queryResult.answer };
  }

  if (context.kind === "clarify") {
    const { draft, missing } = await buildDraft(message, context.draft);
    if (missing.length > 0) {
      return buildClarifyResponse(draft, missing);
    }
    return { type: "confirm", text: draftPreviewText(draft), draft };
  }

  // Estado ocioso (ou uma mensagem solta durante uma confirmação pendente):
  // só entra no fluxo de nova movimentação se a mensagem tiver sinal real
  // de transação (verbo conhecido ou valor). Caso contrário, não inventa
  // um rascunho vazio — pede para o usuário escolher o que quer fazer.
  const isBareTypeWord = /^(despesa|receita)$/i.test(trimmed);
  if (
    !hasTransactionKeyword(message) &&
    detectAmount(message) === null &&
    !isBareTypeWord
  ) {
    return UNKNOWN_RESPONSE;
  }

  const { draft, missing } = await buildDraft(message);
  if (missing.length > 0) {
    return buildClarifyResponse(draft, missing);
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

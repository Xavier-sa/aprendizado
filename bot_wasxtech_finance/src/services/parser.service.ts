import type { TransactionType } from "@prisma/client";
import { parseCurrencyToken } from "@/lib/currency";
import { parseNaturalDate, todayInAppTimeZone } from "@/lib/dates";
import { matchCategory } from "@/utils/category-matcher";
import type { ParsedTransaction, MissingField } from "@/types";

const EXPENSE_KEYWORDS = ["gastei", "paguei", "comprei", "abasteci", "saiu"];
const INCOME_KEYWORDS = ["recebi", "entrou", "ganhei", "caiu"];

function detectType(lower: string): TransactionType | null {
  const hasExpense = EXPENSE_KEYWORDS.some((k) => lower.includes(k));
  const hasIncome = INCOME_KEYWORDS.some((k) => lower.includes(k));
  if (hasExpense && !hasIncome) return "EXPENSE";
  if (hasIncome && !hasExpense) return "INCOME";
  return null;
}

/** Tem palavra-chave de tipo (gastei/recebi/...) — usado para decidir se
 * uma mensagem "parece" uma tentativa de registrar movimentação. */
export function hasTransactionKeyword(text: string): boolean {
  return detectType(text.toLowerCase()) !== null;
}

function stripDateTokens(text: string): string {
  return text
    .replace(/\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/g, " ")
    .replace(/\b(hoje|ontem|anteontem)\b/gi, " ");
}

export function detectAmount(text: string): number | null {
  const withoutDates = stripDateTokens(text);

  const rsMatch = withoutDates.match(/r\$\s*([\d.,]+)/i);
  if (rsMatch) return parseCurrencyToken(rsMatch[1]);

  const reaisMatch = withoutDates.match(/([\d.,]+)\s*reais/i);
  if (reaisMatch) return parseCurrencyToken(reaisMatch[1]);

  const bareMatch = withoutDates.match(
    /\b\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?\b|\b\d+[.,]\d{1,2}\b|\b\d+\b/,
  );
  if (bareMatch) return parseCurrencyToken(bareMatch[0]);

  return null;
}

const LEADING_CONNECTORS = [
  "de",
  "do",
  "da",
  "em",
  "no",
  "na",
  "com",
  "para",
  "pra",
  "um",
  "uma",
  "meu",
  "minha",
];

/**
 * Deriva uma descrição curta a partir do texto livre, removendo o verbo,
 * o valor e a data já reconhecidos, e conectores soltos no início. Pode
 * voltar string vazia quando não sobra nada útil — quem chama decide o
 * fallback (ex.: nome da categoria).
 */
export function extractDescription(message: string): string {
  let remainder = stripDateTokens(message);

  remainder = remainder.replace(/r\$\s*[\d.,]+/gi, " ");
  remainder = remainder.replace(/[\d.,]+\s*reais/gi, " ");
  remainder = remainder.replace(
    /\b\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?\b|\b\d+[.,]\d{1,2}\b|\b\d+\b/g,
    " ",
  );

  for (const keyword of [...EXPENSE_KEYWORDS, ...INCOME_KEYWORDS]) {
    remainder = remainder.replace(new RegExp(`\\b${keyword}\\b`, "gi"), " ");
  }

  let words = remainder.trim().split(/\s+/).filter(Boolean);
  while (
    words.length > 0 &&
    LEADING_CONNECTORS.includes(words[0].toLowerCase())
  ) {
    words = words.slice(1);
  }

  const result = words.join(" ").trim();
  if (!result) return "";
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export interface ParserCategory {
  id: string;
  name: string;
  type: TransactionType;
}

/**
 * Parser determinístico: nunca inventa tipo, valor ou categoria. Tudo que
 * não for reconhecido no texto entra em `missing` para o chat perguntar.
 * Casamentos fracos de categoria viram `suggestedCategory` (precisam de
 * confirmação), nunca `categoryId` direto.
 */
export function parseMessage(
  message: string,
  categories: ParserCategory[],
  reference: Date = new Date(),
): ParsedTransaction {
  const lower = message.toLowerCase();

  const type = detectType(lower);
  const amount = detectAmount(message);
  const transactionDate =
    parseNaturalDate(message, reference) ?? todayInAppTimeZone(reference);
  const description = extractDescription(message);

  const match = matchCategory(message, type);
  let categoryId: string | null = null;
  let categoryName: string | null = null;
  let suggestedCategory: { id: string; name: string } | null = null;

  if (match) {
    const found = categories.find(
      (c) =>
        c.name.toLowerCase() === match.name.toLowerCase() &&
        (!type || c.type === type),
    );
    if (found) {
      if (match.confidence === "high") {
        categoryId = found.id;
        categoryName = found.name;
      } else {
        suggestedCategory = { id: found.id, name: found.name };
      }
    }
  }

  const missing: MissingField[] = [];
  if (!type) missing.push("type");
  if (amount === null) missing.push("amount");
  if (!categoryId) missing.push("category");

  return {
    type,
    amount,
    categoryId,
    categoryName,
    suggestedCategory,
    description,
    transactionDate,
    paymentMethod: null,
    originalMessage: message,
    missing,
  };
}

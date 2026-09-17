import { startOfDay } from "date-fns";
import type { TransactionType } from "@prisma/client";
import { parseCurrencyToken } from "@/lib/currency";
import { parseNaturalDate } from "@/lib/dates";
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

export interface ParserCategory {
  id: string;
  name: string;
  type: TransactionType;
}

/**
 * Parser determinístico: nunca inventa tipo, valor ou categoria. Tudo que
 * não for reconhecido no texto entra em `missing` para o chat perguntar.
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
    parseNaturalDate(message, reference) ?? startOfDay(reference);

  const categoryName = matchCategory(message, type);
  const category = categoryName
    ? categories.find(
        (c) =>
          c.name.toLowerCase() === categoryName.toLowerCase() &&
          (!type || c.type === type),
      )
    : undefined;

  const missing: MissingField[] = [];
  if (!type) missing.push("type");
  if (amount === null) missing.push("amount");
  if (!category) missing.push("category");

  return {
    type,
    amount,
    categoryId: category?.id ?? null,
    categoryName: category?.name ?? categoryName,
    transactionDate,
    paymentMethod: null,
    originalMessage: message,
    missing,
  };
}

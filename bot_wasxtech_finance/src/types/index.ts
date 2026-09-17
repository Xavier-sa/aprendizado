import type { TransactionType } from "@prisma/client";

export type { TransactionType };

export type MissingField = "amount" | "category" | "type";

export interface CategorySuggestion {
  id: string;
  name: string;
}

/**
 * Resultado da interpretação de uma mensagem em linguagem natural.
 * Campos ausentes ficam null e são listados em `missing` — o parser
 * nunca inventa valor ou categoria. `categoryId`/`categoryName` só são
 * preenchidos para casamentos fortes; casamentos fracos (palavra-chave
 * "sugerida") ficam em `suggestedCategory` e exigem confirmação do
 * usuário antes de virar `categoryId`.
 */
export interface ParsedTransaction {
  type: TransactionType | null;
  amount: number | null;
  categoryId: string | null;
  categoryName: string | null;
  suggestedCategory: CategorySuggestion | null;
  description: string;
  transactionDate: Date;
  paymentMethod: string | null;
  originalMessage: string;
  missing: MissingField[];
}

export interface TransactionDTO {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  categoryName: string;
  paymentMethod: string | null;
  transactionDate: string;
  originalMessage: string | null;
}

export interface CategoryDTO {
  id: string;
  name: string;
  type: TransactionType;
}

export interface MonthlyChartPoint {
  month: string; // "YYYY-MM"
  income: number;
  expense: number;
  balance: number;
}

export interface DashboardSummary {
  balance: number;
  monthIncome: number;
  monthExpense: number;
  monthResult: number;
  transactionCount: number;
  expenseByCategory: { category: string; total: number }[];
}

export interface ChatDraft {
  type: TransactionType | null;
  amount: number | null;
  categoryId: string | null;
  categoryName: string | null;
  suggestedCategory: CategorySuggestion | null;
  description: string;
  transactionDate: string; // ISO
  originalMessage: string;
}

export interface DeleteCandidate {
  id: string;
  label: string;
}

export type ChatContext =
  | { kind: "none" }
  | { kind: "confirm_create"; draft: ChatDraft }
  | { kind: "clarify"; draft: ChatDraft; missing: MissingField[] }
  | { kind: "awaiting_new_category_name"; draft: ChatDraft }
  | { kind: "disambiguate_delete"; candidates: DeleteCandidate[] };

export interface ChatRequestBody {
  message: string;
  context?: ChatContext;
}

export type ChatResponseBody =
  | { type: "answer"; text: string }
  | { type: "confirm"; text: string; draft: ChatDraft }
  | {
      type: "clarify";
      text: string;
      missing: MissingField[];
      draft: ChatDraft;
      categoryOptions?: CategoryDTO[];
      suggestedCategory?: CategorySuggestion | null;
    }
  | { type: "created"; text: string; transaction: TransactionDTO }
  | { type: "updated"; text: string; transaction: TransactionDTO }
  | { type: "deleted"; text: string }
  | { type: "disambiguate"; text: string; candidates: DeleteCandidate[] }
  | { type: "cancelled"; text: string }
  | { type: "unknown"; text: string }
  | { type: "info"; text: string };

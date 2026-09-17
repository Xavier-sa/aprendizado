import { startOfDay, endOfDay, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { transactionRepository } from "@/repositories/transaction.repository";
import { categoryRepository } from "@/repositories/category.repository";
import { formatCurrencyBRL } from "@/lib/currency";

export interface QueryResult {
  answer: string;
}

type Handler = (lower: string, reference: Date) => Promise<QueryResult | null>;

function resolvePeriod(lower: string, reference: Date) {
  if (/\bhoje\b/.test(lower)) {
    return { from: startOfDay(reference), to: endOfDay(reference), label: "hoje" };
  }
  return { from: startOfMonth(reference), to: endOfMonth(reference), label: "este mês" };
}

async function findCategoryByKeyword(lower: string) {
  const categories = await categoryRepository.findAll();
  return categories.find((c) => lower.includes(c.name.toLowerCase())) ?? null;
}

/**
 * Só tenta interpretar como consulta se a mensagem realmente parecer uma
 * pergunta — evita que "Gastei 50 no mercado" (um lançamento) seja
 * confundido com "Quanto gastei?" (uma consulta) só por compartilhar o
 * verbo "gastei".
 */
function looksLikeQuery(lower: string): boolean {
  return /\b(quanto|quais|qual|compare|mostre|exiba|veja)\b/.test(lower) || lower.trim().endsWith("?");
}

/**
 * Reconhece um conjunto fechado de perguntas financeiras e responde
 * sempre com dados reais vindos do banco — nunca calcula valores fictícios.
 * Retorna null quando a mensagem não bate com nenhum padrão de consulta
 * (nesse caso o chat tenta interpretar como um novo lançamento).
 */
const HANDLERS: Handler[] = [
  async (lower) => {
    if (!/\bsaldo\b/.test(lower)) return null;
    const balance = await transactionRepository.totalBalance();
    return { answer: `Seu saldo atual é ${formatCurrencyBRL(balance)}.` };
  },

  async (lower, reference) => {
    if (!/compar/.test(lower)) return null;
    const thisStart = startOfMonth(reference);
    const thisEnd = endOfMonth(reference);
    const prevRef = subMonths(reference, 1);
    const prevStart = startOfMonth(prevRef);
    const prevEnd = endOfMonth(prevRef);

    const [thisExpense, prevExpense, thisIncome, prevIncome] = await Promise.all([
      transactionRepository.sumByType({ type: "EXPENSE", from: thisStart, to: thisEnd }),
      transactionRepository.sumByType({ type: "EXPENSE", from: prevStart, to: prevEnd }),
      transactionRepository.sumByType({ type: "INCOME", from: thisStart, to: thisEnd }),
      transactionRepository.sumByType({ type: "INCOME", from: prevStart, to: prevEnd }),
    ]);

    const diff = thisExpense - prevExpense;
    const trend = diff > 0 ? "a mais" : diff < 0 ? "a menos" : "igual";
    return {
      answer:
        `Este mês: despesas ${formatCurrencyBRL(thisExpense)} e receitas ${formatCurrencyBRL(thisIncome)}. ` +
        `Mês anterior: despesas ${formatCurrencyBRL(prevExpense)} e receitas ${formatCurrencyBRL(prevIncome)}. ` +
        `Você gastou ${formatCurrencyBRL(Math.abs(diff))} ${trend} que no mês anterior.`,
    };
  },

  async (lower) => {
    if (!/gast|despes/.test(lower) || !/\bcom\b/.test(lower)) return null;
    const category = await findCategoryByKeyword(lower);
    if (!category) return null;
    const total = await transactionRepository.sumByType({
      type: "EXPENSE",
      categoryId: category.id,
    });
    return { answer: `Você gastou ${formatCurrencyBRL(total)} com ${category.name}.` };
  },

  async (lower, reference) => {
    if (!/entrou|receb/.test(lower)) return null;
    const { from, to, label } = resolvePeriod(lower, reference);
    const total = await transactionRepository.sumByType({ type: "INCOME", from, to });
    return { answer: `Você recebeu ${formatCurrencyBRL(total)} ${label}.` };
  },

  async (lower, reference) => {
    if (!/gastei|saiu|gasto/.test(lower)) return null;
    const { from, to, label } = resolvePeriod(lower, reference);
    const total = await transactionRepository.sumByType({ type: "EXPENSE", from, to });
    return { answer: `Você gastou ${formatCurrencyBRL(total)} ${label}.` };
  },
];

export const queryService = {
  async answer(message: string, reference: Date = new Date()): Promise<QueryResult | null> {
    const lower = message.toLowerCase();
    if (!looksLikeQuery(lower)) return null;
    for (const handler of HANDLERS) {
      const result = await handler(lower, reference);
      if (result) return result;
    }
    return null;
  },
};

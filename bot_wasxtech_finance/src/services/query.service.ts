import {
  todayInAppTimeZone,
  endOfCivilDay,
  startOfCivilMonth,
  endOfCivilMonth,
  addCivilMonths,
} from "@/lib/dates";
import { transactionRepository } from "@/repositories/transaction.repository";
import { categoryRepository } from "@/repositories/category.repository";
import { formatCurrencyBRL } from "@/lib/currency";

export interface QueryResult {
  answer: string;
}

type Handler = (userId: string, lower: string, reference: Date) => Promise<QueryResult | null>;

function resolvePeriod(lower: string, reference: Date) {
  if (/\bhoje\b/.test(lower)) {
    const today = todayInAppTimeZone(reference);
    return { from: today, to: endOfCivilDay(today), label: "hoje" };
  }
  return {
    from: startOfCivilMonth(reference),
    to: endOfCivilMonth(reference),
    label: "este mês",
  };
}

async function findCategoryByKeyword(userId: string, lower: string) {
  const categories = await categoryRepository.findAll(userId);
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
 * sempre com dados reais vindos do banco (só do `userId` autenticado) —
 * nunca calcula valores fictícios. Retorna null quando a mensagem não bate
 * com nenhum padrão de consulta (nesse caso o chat tenta interpretar como
 * um novo lançamento).
 */
const HANDLERS: Handler[] = [
  async (userId, lower) => {
    if (!/\bsaldo\b/.test(lower)) return null;
    const balance = await transactionRepository.totalBalance(userId);
    return { answer: `Seu saldo atual é ${formatCurrencyBRL(balance)}.` };
  },

  async (userId, lower, reference) => {
    if (!/compar/.test(lower)) return null;
    const thisStart = startOfCivilMonth(reference);
    const thisEnd = endOfCivilMonth(reference);
    const prevStart = addCivilMonths(thisStart, -1);
    const prevEnd = endOfCivilMonth(prevStart);

    const [thisExpense, prevExpense, thisIncome, prevIncome] = await Promise.all([
      transactionRepository.sumByType(userId, { type: "EXPENSE", from: thisStart, to: thisEnd }),
      transactionRepository.sumByType(userId, { type: "EXPENSE", from: prevStart, to: prevEnd }),
      transactionRepository.sumByType(userId, { type: "INCOME", from: thisStart, to: thisEnd }),
      transactionRepository.sumByType(userId, { type: "INCOME", from: prevStart, to: prevEnd }),
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

  async (userId, lower) => {
    if (!/gast|despes/.test(lower) || !/\bcom\b/.test(lower)) return null;
    const category = await findCategoryByKeyword(userId, lower);
    if (!category) return null;
    const total = await transactionRepository.sumByType(userId, {
      type: "EXPENSE",
      categoryId: category.id,
    });
    return { answer: `Você gastou ${formatCurrencyBRL(total)} com ${category.name}.` };
  },

  async (userId, lower, reference) => {
    if (!/entrou|receb/.test(lower)) return null;
    const { from, to, label } = resolvePeriod(lower, reference);
    const total = await transactionRepository.sumByType(userId, { type: "INCOME", from, to });
    return { answer: `Você recebeu ${formatCurrencyBRL(total)} ${label}.` };
  },

  async (userId, lower, reference) => {
    if (!/gastei|saiu|gasto/.test(lower)) return null;
    const { from, to, label } = resolvePeriod(lower, reference);
    const total = await transactionRepository.sumByType(userId, { type: "EXPENSE", from, to });
    return { answer: `Você gastou ${formatCurrencyBRL(total)} ${label}.` };
  },
];

export const queryService = {
  async answer(
    userId: string,
    message: string,
    reference: Date = new Date(),
  ): Promise<QueryResult | null> {
    const lower = message.toLowerCase();
    if (!looksLikeQuery(lower)) return null;
    for (const handler of HANDLERS) {
      const result = await handler(userId, lower, reference);
      if (result) return result;
    }
    return null;
  },
};

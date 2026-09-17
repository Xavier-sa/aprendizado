import { format, isSameDay, isValid, startOfDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Reconhece "hoje", "ontem", "anteontem" e datas explícitas dd/mm ou
 * dd/mm/yyyy (também aceita "-" como separador). Retorna null quando
 * nenhum padrão de data é encontrado no texto.
 */
export function parseNaturalDate(
  text: string,
  reference: Date = new Date(),
): Date | null {
  const lower = text.toLowerCase();
  const today = startOfDay(reference);

  if (/\banteontem\b/.test(lower)) return subDays(today, 2);
  if (/\bontem\b/.test(lower)) return subDays(today, 1);
  if (/\bhoje\b/.test(lower)) return today;

  const explicit = lower.match(
    /\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/,
  );
  if (explicit) {
    const day = Number(explicit[1]);
    const month = Number(explicit[2]);
    const yearPart = explicit[3];
    const year = yearPart
      ? Number(yearPart.length === 2 ? `20${yearPart}` : yearPart)
      : reference.getFullYear();

    const date = new Date(year, month - 1, day);

    if (isValid(date) && date.getMonth() === month - 1) {
      return startOfDay(date);
    }
  }

  return null;
}

export function formatDateBR(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

/** Formata "YYYY-MM" para rótulo curto de mês, ex.: "set/26". */
export function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  return format(new Date(year, month - 1, 1), "MMM/yy", { locale: ptBR });
}

/** "Hoje" / "Ontem" quando fizer sentido, senão dd/MM/yyyy. */
export function formatRelativeDateLabel(
  date: Date,
  reference: Date = new Date(),
): string {
  const today = startOfDay(reference);
  if (isSameDay(date, today)) return "Hoje";
  if (isSameDay(date, subDays(today, 1))) return "Ontem";
  return formatDateBR(date);
}

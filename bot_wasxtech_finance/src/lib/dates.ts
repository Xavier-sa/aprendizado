import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Fuso horário civil da aplicação — decide o que "hoje"/"ontem" significam.
 * O servidor (Vercel) roda com fuso local UTC; sem essa configuração,
 * "hoje" à noite em Campo Grande (UTC-4) podia resolver para o dia
 * seguinte no servidor, e qualquer meia-noite UTC exibida no navegador do
 * usuário (fuso negativo) voltava um dia ao ser formatada com funções que
 * leem o horário LOCAL de quem está rodando o código. Nenhum outro lugar
 * do projeto deve hardcodar um fuso — sempre importar `APP_TIME_ZONE`
 * daqui. Ver docs/decisions.md (ADR sobre modelo temporal).
 */
export const APP_TIME_ZONE = process.env.APP_TIME_ZONE?.trim() || "America/Campo_Grande";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function civilPartsAt(instant: Date, timeZone: string): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const map: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = Number(part.value);
  }
  return { year: map.year, month: map.month, day: map.day };
}

/**
 * "Data civil" (um dia do calendário, sem hora) representada como meia-
 * -noite UTC desse dia — é a convenção de armazenamento de
 * `Transaction.transactionDate`. O valor nunca representa um instante de
 * verdade, só o dia que o usuário quis dizer. Ler de volta sempre com
 * `civilDateParts` (componentes UTC), nunca com `getDate()`/`getMonth()`
 * (que dependem do fuso de quem está lendo, não do dia armazenado).
 */
export function civilDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

/** Lê ano/mês/dia de uma data civil já armazenada, sem depender do fuso local de quem lê. */
export function civilDateParts(date: Date): { year: number; month: number; day: number } {
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** Data civil de "agora" no fuso configurado da aplicação (`APP_TIME_ZONE`). */
export function todayInAppTimeZone(reference: Date = new Date()): Date {
  const { year, month, day } = civilPartsAt(reference, APP_TIME_ZONE);
  return civilDate(year, month, day);
}

/** N dias civis antes de uma data civil — aritmética exata em UTC (sem horário de verão/ambiguidade de fuso, diferente de somar/subtrair "24 horas" num instante local). */
export function civilDaysBefore(date: Date, days: number): Date {
  return new Date(date.getTime() - days * ONE_DAY_MS);
}

/** Último instante (23:59:59.999) do dia civil representado por `date`. */
export function endOfCivilDay(date: Date): Date {
  return new Date(date.getTime() + ONE_DAY_MS - 1);
}

/** Desloca uma data civil em N meses (aceita negativo) — aritmética em ano/mês, sem depender de fuso horário. */
export function addCivilMonths(date: Date, months: number): Date {
  const { year, month, day } = civilDateParts(date);
  const totalMonths = year * 12 + (month - 1) + months;
  const newYear = Math.floor(totalMonths / 12);
  const newMonth = ((totalMonths % 12) + 12) % 12;
  return civilDate(newYear, newMonth + 1, day);
}

/** Início do mês civil (fuso da aplicação) que contém `reference`. */
export function startOfCivilMonth(reference: Date = new Date()): Date {
  const { year, month } = civilPartsAt(reference, APP_TIME_ZONE);
  return civilDate(year, month, 1);
}

/** Último instante do mês civil (fuso da aplicação) que contém `reference`. */
export function endOfCivilMonth(reference: Date = new Date()): Date {
  const start = startOfCivilMonth(reference);
  return endOfCivilDay(civilDaysBefore(addCivilMonths(start, 1), 1));
}

/**
 * Reconhece "hoje", "ontem", "anteontem" e datas explícitas dd/mm ou
 * dd/mm/yyyy (também aceita "-" como separador), sempre como data civil
 * no fuso configurado da aplicação — nunca como meia-noite do fuso local
 * de onde o processo Node está rodando. Retorna null quando nenhum
 * padrão de data é encontrado no texto.
 */
export function parseNaturalDate(
  text: string,
  reference: Date = new Date(),
): Date | null {
  const lower = text.toLowerCase();
  const today = todayInAppTimeZone(reference);

  if (/\banteontem\b/.test(lower)) return civilDaysBefore(today, 2);
  if (/\bontem\b/.test(lower)) return civilDaysBefore(today, 1);
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
      : civilDateParts(today).year;

    const date = civilDate(year, month, day);
    const parts = civilDateParts(date);
    // Rejeita datas que o construtor "arredondou" (ex.: 31/02 -> 03/03).
    if (parts.month === month && parts.day === day) {
      return date;
    }
  }

  return null;
}

/**
 * Converte uma data civil (armazenada como meia-noite UTC) numa Date cujos
 * componentes LOCAIS equivalem aos componentes UTC originais — assim,
 * funções do date-fns que leem o horário local (`format`) mostram o dia
 * civil certo, não importa o fuso de quem está rodando o código (servidor
 * ou navegador de quem visualiza).
 */
function toLocalCivilDate(date: Date): Date {
  const { year, month, day } = civilDateParts(date);
  return new Date(year, month - 1, day);
}

export function formatDateBR(date: Date): string {
  return format(toLocalCivilDate(date), "dd/MM/yyyy");
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
  const today = todayInAppTimeZone(reference);
  if (date.getTime() === today.getTime()) return "Hoje";
  if (date.getTime() === civilDaysBefore(today, 1).getTime()) return "Ontem";
  return formatDateBR(date);
}

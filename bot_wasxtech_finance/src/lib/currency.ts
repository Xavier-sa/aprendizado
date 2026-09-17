/**
 * Converte um token numérico em texto livre (pt-BR ou não) para número.
 * Aceita "1.250,90", "1000.50", "100,50", "100", "50".
 */
export function parseCurrencyToken(raw: string): number | null {
  const cleaned = raw.replace(/R\$\s*/gi, "").trim();
  if (!cleaned) return null;

  let normalized: string;
  if (cleaned.includes(".") && cleaned.includes(",")) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (cleaned.includes(",")) {
    normalized = cleaned.replace(",", ".");
  } else {
    normalized = cleaned;
  }

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

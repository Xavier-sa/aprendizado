import type { TransactionType } from "@prisma/client";

interface CategoryRule {
  category: string;
  type: TransactionType;
  keywords: string[];
}

/**
 * Palavras-chave -> categoria padrão. Usado apenas para SUGERIR a
 * categoria a partir do texto da mensagem; se nada casar, o parser não
 * inventa nada e pede a categoria ao usuário (seção 13 do escopo).
 */
const RULES: CategoryRule[] = [
  { category: "Mercado", type: "EXPENSE", keywords: ["mercado", "supermercado", "atacadão", "atacadao"] },
  { category: "Alimentação", type: "EXPENSE", keywords: ["restaurante", "lanche", "ifood", "almoço", "almoco", "jantar", "padaria", "comida"] },
  { category: "Transporte", type: "EXPENSE", keywords: ["uber", "táxi", "taxi", "ônibus", "onibus", "metrô", "metro", "passagem"] },
  { category: "Combustível", type: "EXPENSE", keywords: ["gasolina", "etanol", "posto", "abasteci", "combustível", "combustivel"] },
  { category: "Moradia", type: "EXPENSE", keywords: ["aluguel", "condomínio", "condominio"] },
  { category: "Energia", type: "EXPENSE", keywords: ["energia", "luz"] },
  { category: "Água", type: "EXPENSE", keywords: ["água", "agua"] },
  { category: "Internet", type: "EXPENSE", keywords: ["internet", "wifi", "vivo", "claro", "tim"] },
  { category: "Saúde", type: "EXPENSE", keywords: ["farmácia", "farmacia", "remédio", "remedio", "médico", "medico", "consulta"] },
  { category: "Educação", type: "EXPENSE", keywords: ["curso", "faculdade", "escola", "mensalidade"] },
  { category: "Lazer", type: "EXPENSE", keywords: ["cinema", "viagem", "bar", "show"] },
  { category: "Assinaturas", type: "EXPENSE", keywords: ["netflix", "spotify", "assinatura", "prime"] },
  { category: "Investimentos", type: "EXPENSE", keywords: ["aporte", "corretora"] },
  { category: "Salário", type: "INCOME", keywords: ["salário", "salario", "pagamento"] },
  { category: "Dividendos", type: "INCOME", keywords: ["dividendo", "dividendos"] },
  { category: "Rendimentos", type: "INCOME", keywords: ["rendimento", "rendimentos", "cdb", "tesouro"] },
  { category: "Venda", type: "INCOME", keywords: ["venda", "vendi"] },
  { category: "Reembolso", type: "INCOME", keywords: ["reembolso", "estorno"] },
];

export function matchCategory(
  text: string,
  type: TransactionType | null,
): string | null {
  const lower = text.toLowerCase();
  for (const rule of RULES) {
    if (type && rule.type !== type) continue;
    if (rule.keywords.some((keyword) => lower.includes(keyword))) {
      return rule.category;
    }
  }
  return null;
}

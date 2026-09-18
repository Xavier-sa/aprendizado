import { describe, expect, it } from "vitest";
import {
  parseMessage,
  detectAmount,
  extractDescription,
  hasTransactionKeyword,
  type ParserCategory,
} from "./parser.service";
import { civilDate } from "@/lib/dates";

const CATEGORIES: ParserCategory[] = [
  { id: "cat-mercado", name: "Mercado", type: "EXPENSE" },
  { id: "cat-energia", name: "Energia", type: "EXPENSE" },
  { id: "cat-combustivel", name: "Combustível", type: "EXPENSE" },
  { id: "cat-servicos", name: "Serviços", type: "EXPENSE" },
  { id: "cat-dividendos", name: "Dividendos", type: "INCOME" },
  { id: "cat-salario", name: "Salário", type: "INCOME" },
];

// Instante fixo, sem ambiguidade de fuso: meio-dia UTC de 16/09/2026, que
// cai às 08h em America/Campo_Grande (UTC-4) — dentro do dia civil
// 16/09/2026 em qualquer fuso plausível, então serve de "agora" estável
// para os testes abaixo (ver src/lib/dates.ts para a política temporal).
const REFERENCE = new Date(Date.UTC(2026, 8, 16, 12, 0, 0));

describe("parseMessage — casos da seção 26", () => {
  it("Gastei 50 reais no mercado hoje", () => {
    const result = parseMessage("Gastei 50 reais no mercado hoje", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(50);
    expect(result.categoryName).toBe("Mercado");
    expect(result.transactionDate).toEqual(civilDate(2026, 9, 16));
    expect(result.missing).toEqual([]);
  });

  it("Paguei R$ 120,50 de energia", () => {
    const result = parseMessage("Paguei R$ 120,50 de energia", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(120.5);
    expect(result.categoryName).toBe("Energia");
    expect(result.missing).toEqual([]);
  });

  it("Recebi 198,30 de dividendos", () => {
    const result = parseMessage("Recebi 198,30 de dividendos", CATEGORIES, REFERENCE);
    expect(result.type).toBe("INCOME");
    expect(result.amount).toBe(198.3);
    expect(result.categoryName).toBe("Dividendos");
    expect(result.missing).toEqual([]);
  });

  it("Abasteci 150 reais", () => {
    const result = parseMessage("Abasteci 150 reais", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(150);
    expect(result.categoryName).toBe("Combustível");
    expect(result.missing).toEqual([]);
  });

  it("Recebi meu salário de 2500", () => {
    const result = parseMessage("Recebi meu salário de 2500", CATEGORIES, REFERENCE);
    expect(result.type).toBe("INCOME");
    expect(result.amount).toBe(2500);
    expect(result.categoryName).toBe("Salário");
    expect(result.missing).toEqual([]);
  });

  it("Gastei 90 ontem no mercado", () => {
    const result = parseMessage("Gastei 90 ontem no mercado", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(90);
    expect(result.categoryName).toBe("Mercado");
    expect(result.transactionDate).toEqual(civilDate(2026, 9, 15));
  });

  it("Recebi 100 reais hoje", () => {
    const result = parseMessage("Recebi 100 reais hoje", CATEGORIES, REFERENCE);
    expect(result.type).toBe("INCOME");
    expect(result.amount).toBe(100);
    expect(result.transactionDate).toEqual(civilDate(2026, 9, 16));
  });

  it("Gastei 50 reais no mercado em 18/09/2026 (data explícita)", () => {
    const result = parseMessage(
      "Gastei 50 reais no mercado em 18/09/2026",
      CATEGORIES,
      REFERENCE,
    );
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(50);
    expect(result.transactionDate).toEqual(civilDate(2026, 9, 18));
  });
});

describe("parseMessage — 'hoje' na virada do dia em Campo Grande (bug real corrigido)", () => {
  // 00:05 em Campo Grande (UTC-4) é 04:05 UTC do MESMO dia civil — não
  // pode ser interpretado como o dia anterior só porque o processo Node
  // roda com fuso local UTC (caso do servidor da Vercel).
  it("00:05 em Campo Grande, ainda dia 18, não vira 17", () => {
    const justAfterMidnight = new Date(Date.UTC(2026, 8, 18, 4, 5, 0));
    const result = parseMessage("gastei 50 reais hoje", CATEGORIES, justAfterMidnight);
    expect(result.transactionDate).toEqual(civilDate(2026, 9, 18));
  });

  // 23:30 em Campo Grande do dia 18 já é 03:30 UTC do dia 19 — "hoje"
  // continua sendo 18 para quem está em Campo Grande, mesmo que o
  // relógio UTC do servidor já tenha virado a página do dia.
  it("23:30 em Campo Grande (03:30 UTC do dia seguinte) continua sendo o dia 18", () => {
    const lateEvening = new Date(Date.UTC(2026, 8, 19, 3, 30, 0));
    const result = parseMessage("gastei 50 reais hoje", CATEGORIES, lateEvening);
    expect(result.transactionDate).toEqual(civilDate(2026, 9, 18));
  });
});

describe("detectAmount — formatos de valor", () => {
  it.each([
    ["Gastei 1.000,50 no mercado", 1000.5],
    ["Gastei 1000.50 no mercado", 1000.5],
    ["Gastei R$ 50 no mercado", 50],
    ["Gastei 50 reais no mercado", 50],
  ])("%s -> %d", (text, expected) => {
    expect(detectAmount(text)).toBe(expected);
  });
});

describe("parseMessage — mensagens incompletas", () => {
  it("sem valor: 'Gastei no mercado hoje'", () => {
    const result = parseMessage("Gastei no mercado hoje", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBeNull();
    expect(result.missing).toContain("amount");
  });

  it("sem categoria: 'Gastei 100'", () => {
    const result = parseMessage("Gastei 100", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(100);
    expect(result.categoryId).toBeNull();
    expect(result.missing).toContain("category");
  });

  it("sem tipo nem categoria: '100'", () => {
    const result = parseMessage("100", CATEGORIES, REFERENCE);
    expect(result.type).toBeNull();
    expect(result.amount).toBe(100);
    expect(result.missing).toContain("type");
    expect(result.missing).toContain("category");
  });
});

describe("parseMessage — categoria sugerida (não aplica sozinha)", () => {
  it("'Gastei 250 em serviço de solda' sugere Serviços mas não aplica direto", () => {
    const result = parseMessage("Gastei 250 em serviço de solda", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(250);
    expect(result.categoryId).toBeNull();
    expect(result.categoryName).toBeNull();
    expect(result.suggestedCategory).toEqual({ id: "cat-servicos", name: "Serviços" });
    expect(result.missing).toContain("category");
  });

  it("'250 solda' (sem verbo) também sugere Serviços e fica sem tipo", () => {
    const result = parseMessage("250 solda", CATEGORIES, REFERENCE);
    expect(result.type).toBeNull();
    expect(result.amount).toBe(250);
    expect(result.suggestedCategory).toEqual({ id: "cat-servicos", name: "Serviços" });
    expect(result.missing).toEqual(["type", "category"]);
  });

  it("casamento forte (mercado) continua aplicando direto, sem suggestedCategory", () => {
    const result = parseMessage("Gastei 50 no mercado", CATEGORIES, REFERENCE);
    expect(result.categoryId).toBe("cat-mercado");
    expect(result.suggestedCategory).toBeNull();
  });
});

describe("extractDescription", () => {
  it.each([
    ["Gastei 250 em serviço de solda", "Serviço de solda"],
    ["Paguei R$ 120,50 de energia", "Energia"],
    ["Recebi 198,30 de dividendos", "Dividendos"],
    ["Abasteci 150 reais", ""],
  ])("%s -> %s", (text, expected) => {
    expect(extractDescription(text)).toBe(expected);
  });
});

describe("hasTransactionKeyword", () => {
  it("reconhece verbos de despesa/receita", () => {
    expect(hasTransactionKeyword("Gastei 50 no mercado")).toBe(true);
    expect(hasTransactionKeyword("Recebi 200")).toBe(true);
  });

  it("não reconhece texto solto", () => {
    expect(hasTransactionKeyword("obrigado")).toBe(false);
    expect(hasTransactionKeyword("qual meu saldo?")).toBe(false);
  });
});

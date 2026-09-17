import { describe, expect, it } from "vitest";
import { parseMessage, detectAmount, type ParserCategory } from "./parser.service";

const CATEGORIES: ParserCategory[] = [
  { id: "cat-mercado", name: "Mercado", type: "EXPENSE" },
  { id: "cat-energia", name: "Energia", type: "EXPENSE" },
  { id: "cat-combustivel", name: "Combustível", type: "EXPENSE" },
  { id: "cat-dividendos", name: "Dividendos", type: "INCOME" },
  { id: "cat-salario", name: "Salário", type: "INCOME" },
];

const REFERENCE = new Date(2026, 8, 16); // 16/09/2026

describe("parseMessage — casos da seção 26", () => {
  it("Gastei 50 reais no mercado hoje", () => {
    const result = parseMessage("Gastei 50 reais no mercado hoje", CATEGORIES, REFERENCE);
    expect(result.type).toBe("EXPENSE");
    expect(result.amount).toBe(50);
    expect(result.categoryName).toBe("Mercado");
    expect(result.transactionDate).toEqual(REFERENCE);
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
    const yesterday = new Date(2026, 8, 15);
    expect(result.transactionDate).toEqual(yesterday);
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

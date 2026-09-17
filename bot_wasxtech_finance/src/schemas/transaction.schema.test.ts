import { describe, expect, it } from "vitest";
import { createTransactionSchema, updateTransactionSchema } from "./transaction.schema";

/**
 * Mass assignment: um usuário mal-intencionado pode enviar qualquer campo
 * extra pelo DevTools/Postman. `userId`/`id`/`createdAt`/`updatedAt`
 * nunca podem vir do cliente — o Zod precisa descartá-los silenciosamente
 * (comportamento padrão de `z.object()`, não `.passthrough()`).
 * Ver docs/security.md, seção "Mass assignment".
 */
describe("createTransactionSchema — mass assignment", () => {
  const validPayload = {
    description: "Mercado",
    amount: 50,
    type: "EXPENSE" as const,
    categoryId: "cat-1",
    transactionDate: "2026-01-01",
  };

  it("descarta userId/id/createdAt/updatedAt enviados no body", () => {
    const result = createTransactionSchema.safeParse({
      ...validPayload,
      userId: "usuario-de-outra-pessoa",
      id: "id-forcado-pelo-cliente",
      createdAt: "2000-01-01",
      updatedAt: "2000-01-01",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).not.toHaveProperty("userId");
    expect(result.data).not.toHaveProperty("id");
    expect(result.data).not.toHaveProperty("createdAt");
    expect(result.data).not.toHaveProperty("updatedAt");
  });

  it("rejeita valor negativo (não deixa passar como se fosse válido)", () => {
    const result = createTransactionSchema.safeParse({ ...validPayload, amount: -50 });
    expect(result.success).toBe(false);
  });
});

describe("updateTransactionSchema — mass assignment", () => {
  it("descarta userId mesmo em atualização parcial", () => {
    const result = updateTransactionSchema.safeParse({
      amount: 999999,
      userId: "usuario-de-outra-pessoa",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).not.toHaveProperty("userId");
    expect(Object.keys(result.data)).toEqual(["amount"]);
  });
});

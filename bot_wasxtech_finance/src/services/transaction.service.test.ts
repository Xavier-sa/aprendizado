import { describe, expect, it, vi, beforeEach } from "vitest";
import type { CreateTransactionInput } from "@/schemas/transaction.schema";

const USER_A = "user-a";
const USER_B = "user-b";

const categoryRepositoryMock = {
  findById: vi.fn(),
};

const transactionRepositoryMock = {
  create: vi.fn((data: Record<string, unknown>) =>
    Promise.resolve({
      id: "tx-1",
      ...data,
      category: { id: data.categoryId, name: "Mercado" },
    }),
  ),
  update: vi.fn(),
  delete: vi.fn(),
};

vi.mock("@/repositories/category.repository", () => ({
  categoryRepository: categoryRepositoryMock,
}));
vi.mock("@/repositories/transaction.repository", () => ({
  transactionRepository: transactionRepositoryMock,
}));

const { transactionService } = await import("./transaction.service");

const GLOBAL_CATEGORY = { id: "cat-global", type: "EXPENSE" as const, userId: null };

beforeEach(() => {
  vi.clearAllMocks();
  categoryRepositoryMock.findById.mockResolvedValue(GLOBAL_CATEGORY);
});

const baseInput: CreateTransactionInput = {
  description: "Mercado",
  amount: 50,
  type: "EXPENSE",
  categoryId: "cat-global",
  transactionDate: new Date("2026-01-01"),
  paymentMethod: null,
  originalMessage: null,
};

describe("transactionService.create — userId nunca vem do input", () => {
  it("usa o userId passado explicitamente, ignorando qualquer 'userId' que porventura viesse dentro do input", async () => {
    // Simula um input que, por um bug em outra camada, carregasse um
    // userId estranho — o service não deve nem olhar para ele.
    const tamperedInput = { ...baseInput, userId: "usuario-hackeado" } as CreateTransactionInput;

    await transactionService.create(USER_A, tamperedInput);

    expect(transactionRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({ userId: USER_A }),
    );
    const callArg = transactionRepositoryMock.create.mock.calls[0][0];
    expect(callArg.userId).toBe(USER_A);
    expect(callArg.userId).not.toBe("usuario-hackeado");
  });

  it("recusa criar a transação com uma categoria que não é global nem do próprio usuário", async () => {
    categoryRepositoryMock.findById.mockResolvedValue(null); // não visível para USER_B

    await expect(transactionService.create(USER_B, baseInput)).rejects.toThrow(
      "Categoria não encontrada",
    );
    expect(categoryRepositoryMock.findById).toHaveBeenCalledWith(baseInput.categoryId, USER_B);
    expect(transactionRepositoryMock.create).not.toHaveBeenCalled();
  });
});

describe("transactionService.update/remove — repository nega, service não inventa sucesso", () => {
  it("update: se o repository não encontra a linha (id não é do usuário), lança erro genérico", async () => {
    transactionRepositoryMock.update.mockResolvedValue(null);
    await expect(
      transactionService.update("tx-de-outro-usuario", USER_B, { amount: 10 }),
    ).rejects.toThrow("Movimentação não encontrada");
  });

  it("remove: se o repository não apaga nada (id não é do usuário), lança erro genérico", async () => {
    transactionRepositoryMock.delete.mockResolvedValue(false);
    await expect(transactionService.remove("tx-de-outro-usuario", USER_B)).rejects.toThrow(
      "Movimentação não encontrada",
    );
  });
});

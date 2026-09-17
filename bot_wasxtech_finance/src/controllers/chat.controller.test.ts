import { describe, expect, it, vi, beforeEach } from "vitest";

const USER_ID = "user-1";

const CATEGORIES = [
  { id: "cat-mercado", name: "Mercado", type: "EXPENSE" as const },
  { id: "cat-servicos", name: "Serviços", type: "EXPENSE" as const },
  { id: "cat-salario", name: "Salário", type: "INCOME" as const },
];

const categoryRepositoryMock = {
  findAll: vi.fn().mockResolvedValue(CATEGORIES),
  findByType: vi.fn((type: "EXPENSE" | "INCOME") =>
    Promise.resolve(CATEGORIES.filter((c) => c.type === type)),
  ),
  findById: vi.fn(),
  findByName: vi.fn().mockResolvedValue(null),
  create: vi.fn(
    ({ name, type }: { name: string; type: "EXPENSE" | "INCOME"; userId: string }) =>
      Promise.resolve({ id: "cat-new", name, type }),
  ),
};

const transactionRepositoryMock = {
  findLast: vi.fn().mockResolvedValue(null),
  findMany: vi.fn().mockResolvedValue([]),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  count: vi.fn().mockResolvedValue(0),
  sumByType: vi.fn().mockResolvedValue(0),
  sumByCategory: vi.fn().mockResolvedValue([]),
  monthlySeries: vi.fn().mockResolvedValue([]),
  balanceBefore: vi.fn().mockResolvedValue(0),
  totalBalance: vi.fn().mockResolvedValue(1234.56),
};

const transactionServiceMock = {
  create: vi.fn((_userId: string, input: Record<string, unknown>) =>
    Promise.resolve({
      id: "tx-1",
      ...input,
      categoryName: "Mercado",
      transactionDate: new Date().toISOString(),
    }),
  ),
  update: vi.fn(),
  remove: vi.fn(),
};

vi.mock("@/repositories/category.repository", () => ({
  categoryRepository: categoryRepositoryMock,
}));
vi.mock("@/repositories/transaction.repository", () => ({
  transactionRepository: transactionRepositoryMock,
}));
vi.mock("@/services/transaction.service", () => ({
  transactionService: transactionServiceMock,
}));

const { handleChat } = await import("./chat.controller");
import type { ChatContext, ChatRequestBody } from "@/types";

function chat(body: ChatRequestBody) {
  return handleChat(USER_ID, body);
}

beforeEach(() => {
  vi.clearAllMocks();
  categoryRepositoryMock.findAll.mockResolvedValue(CATEGORIES);
  categoryRepositoryMock.findByType.mockImplementation((type: "EXPENSE" | "INCOME") =>
    Promise.resolve(CATEGORIES.filter((c) => c.type === type)),
  );
  categoryRepositoryMock.findByName.mockResolvedValue(null);
  transactionRepositoryMock.findLast.mockResolvedValue(null);
  transactionRepositoryMock.findMany.mockResolvedValue([]);
  transactionRepositoryMock.totalBalance.mockResolvedValue(1234.56);
});

describe("handleChat — intenção e estado da conversa", () => {
  it("mensagem sem sinal de transação nem consulta -> unknown, sem criar rascunho", async () => {
    const response = await chat({ message: "obrigado" });
    expect(response.type).toBe("unknown");
  });

  it("'gastei 250 em serviço de solda' sugere categoria, não pergunta em texto puro sem opções", async () => {
    const response = await chat({ message: "gastei 250 em serviço de solda" });
    expect(response.type).toBe("clarify");
    if (response.type !== "clarify") throw new Error("esperado clarify");
    expect(response.missing).toEqual(["category"]);
    expect(response.suggestedCategory).toEqual({ id: "cat-servicos", name: "Serviços" });
    expect(response.categoryOptions?.map((c) => c.name)).toContain("Mercado");
    expect(response.draft.description).toBe("Serviço de solda");
  });

  it("'250 solda' sem verbo pergunta o tipo primeiro, mantendo o rascunho", async () => {
    const response = await chat({ message: "250 solda" });
    expect(response.type).toBe("clarify");
    if (response.type !== "clarify") throw new Error("esperado clarify");
    expect(response.missing[0]).toBe("type");
    expect(response.draft.amount).toBe(250);
    expect(response.categoryOptions).toBeUndefined();
  });

  it("continuar a mesma movimentação: responder 'despesa' preenche o tipo e mantém o valor", async () => {
    const first = await chat({ message: "250 solda" });
    if (first.type !== "clarify") throw new Error("esperado clarify");

    const second = await chat({
      message: "despesa",
      context: { kind: "clarify", draft: first.draft, missing: first.missing },
    });
    expect(second.type).toBe("clarify");
    if (second.type !== "clarify") throw new Error("esperado clarify");
    expect(second.draft.type).toBe("EXPENSE");
    expect(second.draft.amount).toBe(250);
    expect(second.missing).toEqual(["category"]);
  });

  it("cancelar durante uma pergunta pendente não repete a pergunta", async () => {
    const context: ChatContext = {
      kind: "clarify",
      draft: {
        type: "EXPENSE",
        amount: 250,
        categoryId: null,
        categoryName: null,
        suggestedCategory: { id: "cat-servicos", name: "Serviços" },
        description: "Serviço de solda",
        transactionDate: new Date().toISOString(),
        originalMessage: "gastei 250 em serviço de solda",
      },
      missing: ["category"],
    };
    const response = await chat({ message: "não", context });
    expect(response.type).toBe("cancelled");
  });

  it("consulta durante uma pergunta pendente responde direto, sem repetir a pergunta", async () => {
    const context: ChatContext = {
      kind: "clarify",
      draft: {
        type: "EXPENSE",
        amount: 250,
        categoryId: null,
        categoryName: null,
        suggestedCategory: null,
        description: "Serviço de solda",
        transactionDate: new Date().toISOString(),
        originalMessage: "gastei 250 em serviço de solda",
      },
      missing: ["category"],
    };
    const response = await chat({ message: "qual meu saldo?", context });
    expect(response.type).toBe("answer");
    if (response.type !== "answer") throw new Error("esperado answer");
    expect(response.text).toContain("1.234,56");
    // "Qual meu saldo?" nunca pode calcular em cima do histórico de outro
    // usuário — o saldo consultado tem que ser sempre o de quem perguntou.
    expect(transactionRepositoryMock.totalBalance).toHaveBeenCalledWith(USER_ID);
  });

  it("'apague meu último lançamento' só considera o último lançamento DO usuário autenticado", async () => {
    await chat({ message: "apague meu último lançamento" });
    expect(transactionRepositoryMock.findLast).toHaveBeenCalledWith(USER_ID);
  });

  it("confirmar cria a transação", async () => {
    const context: ChatContext = {
      kind: "confirm_create",
      draft: {
        type: "EXPENSE",
        amount: 250,
        categoryId: "cat-servicos",
        categoryName: "Serviços",
        suggestedCategory: null,
        description: "Serviço de solda",
        transactionDate: new Date().toISOString(),
        originalMessage: "gastei 250 em serviço de solda",
      },
      missing: [],
    } as unknown as ChatContext;
    const response = await chat({ message: "sim", context });
    expect(response.type).toBe("created");
    expect(transactionServiceMock.create).toHaveBeenCalledTimes(1);
    expect(transactionServiceMock.create).toHaveBeenCalledWith(
      USER_ID,
      expect.objectContaining({ categoryId: "cat-servicos" }),
    );
  });

  it("cancelar a confirmação não cria a transação", async () => {
    const context: ChatContext = {
      kind: "confirm_create",
      draft: {
        type: "EXPENSE",
        amount: 250,
        categoryId: "cat-servicos",
        categoryName: "Serviços",
        suggestedCategory: null,
        description: "Serviço de solda",
        transactionDate: new Date().toISOString(),
        originalMessage: "gastei 250 em serviço de solda",
      },
      missing: [],
    } as unknown as ChatContext;
    const response = await chat({ message: "não", context });
    expect(response.type).toBe("cancelled");
    expect(transactionServiceMock.create).not.toHaveBeenCalled();
  });

  it("+ Nova categoria: cria a categoria e segue para confirmação", async () => {
    const draft = {
      type: "EXPENSE" as const,
      amount: 250,
      categoryId: null,
      categoryName: null,
      suggestedCategory: null,
      description: "Serviço de solda",
      transactionDate: new Date().toISOString(),
      originalMessage: "gastei 250 em serviço de solda",
    };
    const response = await chat({
      message: "Manutenção",
      context: { kind: "awaiting_new_category_name", draft },
    });
    expect(categoryRepositoryMock.create).toHaveBeenCalledWith({
      name: "Manutenção",
      type: "EXPENSE",
      userId: USER_ID,
    });
    expect(response.type).toBe("confirm");
    if (response.type !== "confirm") throw new Error("esperado confirm");
    expect(response.draft.categoryName).toBe("Manutenção");
  });
});

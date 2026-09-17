import { describe, expect, it, vi, beforeEach } from "vitest";

interface FakeTransaction {
  id: string;
  userId: string;
  categoryId: string;
  type: "EXPENSE" | "INCOME";
  amount: number;
  description: string;
  paymentMethod: string | null;
  transactionDate: Date;
  originalMessage: string | null;
  createdAt: Date;
}

let rows: FakeTransaction[] = [];
let nextId = 1;

function withCategory(row: FakeTransaction) {
  return { ...row, category: { id: row.categoryId, name: "Categoria de teste" } };
}

function matches(row: FakeTransaction, where: { id?: string; userId?: string; categoryId?: string }) {
  if (where.id && row.id !== where.id) return false;
  if (where.userId && row.userId !== where.userId) return false;
  if (where.categoryId && row.categoryId !== where.categoryId) return false;
  return true;
}

const fakePrisma = {
  transaction: {
    create: vi.fn(({ data }: { data: Omit<FakeTransaction, "id" | "createdAt"> }) => {
      // Timestamp monotônico (não `new Date()`): dois `create` no mesmo teste
      // podem cair no mesmo milissegundo e tornar a ordenação por
      // createdAt (usada em findLast) instável.
      const row: FakeTransaction = {
        ...data,
        id: `tx-${nextId}`,
        createdAt: new Date(2026, 0, 1, 0, 0, 0, nextId),
      };
      nextId += 1;
      rows.push(row);
      return Promise.resolve(withCategory(row));
    }),
    findMany: vi.fn(({ where }: { where: Record<string, unknown> }) =>
      Promise.resolve(
        rows
          .filter((r) => matches(r, where))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map(withCategory),
      ),
    ),
    findFirst: vi.fn(({ where }: { where: Record<string, unknown> }) => {
      const candidates = rows.filter((r) => matches(r, where));
      candidates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return Promise.resolve(candidates[0] ? withCategory(candidates[0]) : null);
    }),
    findUnique: vi.fn(({ where }: { where: { id: string } }) => {
      const found = rows.find((r) => r.id === where.id);
      return Promise.resolve(found ? withCategory(found) : null);
    }),
    updateMany: vi.fn(({ where, data }: { where: Record<string, unknown>; data: Partial<FakeTransaction> }) => {
      const matched = rows.filter((r) => matches(r, where));
      rows = rows.map((r) => (matches(r, where) ? { ...r, ...data } : r));
      return Promise.resolve({ count: matched.length });
    }),
    deleteMany: vi.fn(({ where }: { where: Record<string, unknown> }) => {
      const before = rows.length;
      rows = rows.filter((r) => !matches(r, where));
      return Promise.resolve({ count: before - rows.length });
    }),
    count: vi.fn(({ where }: { where: Record<string, unknown> }) =>
      Promise.resolve(rows.filter((r) => matches(r, where)).length),
    ),
  },
};

vi.mock("@/lib/prisma", () => ({ prisma: fakePrisma }));

const { transactionRepository } = await import("./transaction.repository");

const USER_A = "user-a";
const USER_B = "user-b";

function baseTx(overrides: Partial<FakeTransaction> = {}): Omit<FakeTransaction, "id" | "createdAt"> {
  return {
    userId: USER_A,
    categoryId: "cat-mercado",
    type: "EXPENSE",
    amount: 50,
    description: "Mercado",
    paymentMethod: null,
    transactionDate: new Date("2026-09-01"),
    originalMessage: null,
    ...overrides,
  };
}

beforeEach(() => {
  rows = [];
  nextId = 1;
  vi.clearAllMocks();
});

describe("transactionRepository — isolamento entre usuários", () => {
  it("B não vê a movimentação criada por A em findMany", async () => {
    await transactionRepository.create(baseTx({ userId: USER_A }));
    await transactionRepository.create(baseTx({ userId: USER_B, description: "Aluguel" }));

    const forA = await transactionRepository.findMany(USER_A);
    const forB = await transactionRepository.findMany(USER_B);

    expect(forA).toHaveLength(1);
    expect(forA[0].description).toBe("Mercado");
    expect(forB).toHaveLength(1);
    expect(forB[0].description).toBe("Aluguel");
  });

  it("B não consegue ler a movimentação de A por id (findById)", async () => {
    const created = await transactionRepository.create(baseTx({ userId: USER_A }));

    const foundByOwner = await transactionRepository.findById(created.id, USER_A);
    const foundByOther = await transactionRepository.findById(created.id, USER_B);

    expect(foundByOwner?.id).toBe(created.id);
    expect(foundByOther).toBeNull();
  });

  it("B não consegue editar a movimentação de A (update retorna null)", async () => {
    const created = await transactionRepository.create(baseTx({ userId: USER_A }));

    const resultForB = await transactionRepository.update(created.id, USER_B, { amount: 9999 });
    const resultForA = await transactionRepository.update(created.id, USER_A, { amount: 75 });

    expect(resultForB).toBeNull();
    expect(resultForA?.amount).toBe(75);
  });

  it("B não consegue excluir a movimentação de A (delete retorna false)", async () => {
    const created = await transactionRepository.create(baseTx({ userId: USER_A }));

    const deletedByB = await transactionRepository.delete(created.id, USER_B);
    const stillThere = await transactionRepository.findById(created.id, USER_A);
    const deletedByA = await transactionRepository.delete(created.id, USER_A);

    expect(deletedByB).toBe(false);
    expect(stillThere).not.toBeNull();
    expect(deletedByA).toBe(true);
  });

  it("'último lançamento' (findLast) nunca cruza usuários", async () => {
    await transactionRepository.create(baseTx({ userId: USER_A, description: "Primeiro de A" }));
    await transactionRepository.create(baseTx({ userId: USER_B, description: "Único de B" }));
    await transactionRepository.create(baseTx({ userId: USER_A, description: "Segundo de A" }));

    const lastForA = await transactionRepository.findLast(USER_A);
    const lastForB = await transactionRepository.findLast(USER_B);

    expect(lastForA?.description).toBe("Segundo de A");
    expect(lastForB?.description).toBe("Único de B");
  });

  it("count por usuário não soma o histórico de outra pessoa", async () => {
    await transactionRepository.create(baseTx({ userId: USER_A }));
    await transactionRepository.create(baseTx({ userId: USER_A }));
    await transactionRepository.create(baseTx({ userId: USER_B }));

    expect(await transactionRepository.count(USER_A)).toBe(2);
    expect(await transactionRepository.count(USER_B)).toBe(1);
  });
});

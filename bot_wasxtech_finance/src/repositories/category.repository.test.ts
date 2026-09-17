import { describe, expect, it, vi, beforeEach } from "vitest";

interface FakeCategory {
  id: string;
  name: string;
  type: "EXPENSE" | "INCOME";
  userId: string | null;
}

let rows: FakeCategory[] = [];
let nextId = 1;

function matchesUserVisibility(row: FakeCategory, userId: string): boolean {
  return row.userId === null || row.userId === userId;
}

const fakePrisma = {
  category: {
    findMany: vi.fn(
      ({
        where,
        select,
      }: {
        where: { type?: string; OR?: { userId: string | null }[] };
        select?: Record<string, boolean>;
      }) => {
        const filtered = rows.filter((r) => {
          if (where.type && r.type !== where.type) return false;
          if (where.OR) {
            const userId = where.OR.find((c) => c.userId !== null)?.userId ?? null;
            if (userId === null) return r.userId === null;
            return matchesUserVisibility(r, userId);
          }
          return true;
        });
        // Reproduz o `select` do Prisma de verdade: se o repository pedir
        // campos específicos, o "banco" só devolve esses campos — é assim
        // que se prova que userId/createdAt/updatedAt não vazam na API
        // (ver docs/security.md, "Respostas das APIs").
        if (!select) return Promise.resolve(filtered);
        return Promise.resolve(
          filtered.map((r) =>
            Object.fromEntries(
              Object.entries(r).filter(([key]) => select[key]),
            ),
          ),
        );
      },
    ),
    findFirst: vi.fn(
      ({ where }: { where: { id?: string; name?: unknown; type?: string; OR?: { userId: string | null }[] } }) => {
        const userId = where.OR?.find((c) => c.userId !== null)?.userId ?? null;
        const found = rows.find((r) => {
          if (where.id && r.id !== where.id) return false;
          if (where.type && r.type !== where.type) return false;
          if (userId !== null && !matchesUserVisibility(r, userId)) return false;
          return true;
        });
        return Promise.resolve(found ?? null);
      },
    ),
    create: vi.fn(({ data }: { data: { name: string; type: "EXPENSE" | "INCOME"; userId?: string } }) => {
      const row: FakeCategory = {
        id: `cat-${nextId++}`,
        name: data.name,
        type: data.type,
        userId: data.userId ?? null,
      };
      rows.push(row);
      return Promise.resolve(row);
    }),
  },
};

vi.mock("@/lib/prisma", () => ({ prisma: fakePrisma }));

const { categoryRepository } = await import("./category.repository");

const USER_A = "user-a";
const USER_B = "user-b";

beforeEach(() => {
  nextId = 1;
  rows = [
    { id: "cat-global-1", name: "Mercado", type: "EXPENSE", userId: null },
    { id: "cat-global-2", name: "Salário", type: "INCOME", userId: null },
  ];
  vi.clearAllMocks();
});

describe("categoryRepository — isolamento entre usuários", () => {
  it("categoria global aparece para qualquer usuário", async () => {
    const forA = await categoryRepository.findAll(USER_A);
    const forB = await categoryRepository.findAll(USER_B);
    expect(forA.map((c) => c.id)).toContain("cat-global-1");
    expect(forB.map((c) => c.id)).toContain("cat-global-1");
  });

  it("categoria personalizada criada por A não aparece para B", async () => {
    const custom = await categoryRepository.create({
      name: "Presente da Maria",
      type: "EXPENSE",
      userId: USER_A,
    });

    const forA = await categoryRepository.findAll(USER_A);
    const forB = await categoryRepository.findAll(USER_B);

    expect(forA.map((c) => c.id)).toContain(custom.id);
    expect(forB.map((c) => c.id)).not.toContain(custom.id);
  });

  it("findById não retorna categoria personalizada de outro usuário", async () => {
    const custom = await categoryRepository.create({
      name: "Assinatura pessoal",
      type: "EXPENSE",
      userId: USER_A,
    });

    const foundByOwner = await categoryRepository.findById(custom.id, USER_A);
    const foundByOther = await categoryRepository.findById(custom.id, USER_B);

    expect(foundByOwner?.id).toBe(custom.id);
    expect(foundByOther).toBeNull();
  });

  it("findByType respeita a mesma regra de visibilidade", async () => {
    await categoryRepository.create({ name: "Bônus", type: "INCOME", userId: USER_A });

    const forA = await categoryRepository.findByType("INCOME", USER_A);
    const forB = await categoryRepository.findByType("INCOME", USER_B);

    expect(forA.map((c) => c.name)).toContain("Bônus");
    expect(forB.map((c) => c.name)).not.toContain("Bônus");
    expect(forB.map((c) => c.name)).toContain("Salário");
  });

  it("findAll/findByType nunca devolvem userId/createdAt/updatedAt (só id/name/type)", async () => {
    await categoryRepository.create({ name: "Pessoal", type: "EXPENSE", userId: USER_A });

    const all = await categoryRepository.findAll(USER_A);
    const byType = await categoryRepository.findByType("EXPENSE", USER_A);

    for (const category of [...all, ...byType]) {
      expect(Object.keys(category).sort()).toEqual(["id", "name", "type"]);
    }
  });
});

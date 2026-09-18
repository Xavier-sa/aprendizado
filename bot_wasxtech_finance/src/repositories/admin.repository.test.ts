import { beforeEach, describe, expect, it, vi } from "vitest";
import { Prisma } from "@prisma/client";
const mocks = vi.hoisted(() => ({ user: { findMany: vi.fn(), count: vi.fn(), findUnique: vi.fn() },
  transaction: { findMany: vi.fn(), count: vi.fn(), groupBy: vi.fn() }, $queryRaw: vi.fn() }));
vi.mock("@/lib/prisma", () => ({ prisma: mocks }));
import { adminRepository } from "./admin.repository";
import { adminService } from "@/services/admin.service";
beforeEach(() => {
  vi.resetAllMocks();
  mocks.user.findMany.mockResolvedValue([]);
  mocks.user.count.mockResolvedValue(2);
  mocks.transaction.findMany.mockResolvedValue([]);
  mocks.transaction.count.mockResolvedValue(3);
  mocks.transaction.groupBy.mockResolvedValue([]);
  mocks.$queryRaw.mockResolvedValue([]);
});
describe("global administrative repository and user detail scope", () => {
  it("paginates users and selects no authentication data", async () => {
    await adminRepository.users({ page: 3, pageSize: 10, search: "ana" });
    const args = mocks.user.findMany.mock.calls[0][0];
    expect(args).toMatchObject({ skip: 20, take: 10, where: { OR: [
      { name: { contains: "ana", mode: "insensitive" } }, { email: { contains: "ana", mode: "insensitive" } },
    ] } });
    expect(Object.keys(args.select).sort()).toEqual(["_count", "createdAt", "email", "id", "name", "role"]);
    expect(args.include).toBeUndefined();
  });
  it("applies every filter to both records and count, with inclusive final UTC day", async () => {
    await adminRepository.transactions({ page: 2, pageSize: 25, userId: "u", categoryId: "c", type: "EXPENSE",
      from: "2026-09-01", to: "2026-09-30", search: "pizza" });
    const args = mocks.transaction.findMany.mock.calls[0][0];
    expect(args).toMatchObject({ skip: 25, take: 25, where: { userId: "u", categoryId: "c", type: "EXPENSE",
      description: { contains: "pizza", mode: "insensitive" }, transactionDate: {
        gte: new Date("2026-09-01T00:00:00Z"), lt: new Date("2026-10-01T00:00:00Z"),
      } } });
    expect(mocks.transaction.count).toHaveBeenCalledWith({ where: args.where });
    expect(args.select.user).toEqual({ select: { id: true, name: true, email: true } });
    expect(args.select.originalMessage).toBeUndefined();
  });
  it("serializes exact decimal amounts without returning Prisma objects", async () => {
    mocks.transaction.findMany.mockResolvedValue([{ id: "t", amount: new Prisma.Decimal("123.45") }]);
    expect((await adminRepository.transactions({ page: 1, pageSize: 25 })).items[0].amount).toBe("123.45");
  });
  it("computes sums and volume exactly as registered values", async () => {
    mocks.transaction.groupBy.mockResolvedValue([
      { type: "INCOME", _sum: { amount: new Prisma.Decimal("0.10") } },
      { type: "EXPENSE", _sum: { amount: new Prisma.Decimal("0.20") } },
    ]);
    expect(await adminRepository.summary()).toMatchObject({ income: "0.10", expense: "0.20", volume: "0.30", balance: "-0.10" });
  });
  it("forces detail transactions and totals to the path user despite conflicting payload filter", async () => {
    mocks.user.findUnique.mockResolvedValue({ id: "target" });
    await adminService.user("target", { page: 1, pageSize: 25, userId: "other" });
    expect(mocks.transaction.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: "target" } }));
    expect(mocks.transaction.groupBy).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: "target" } }));
    expect(mocks.user.count).toHaveBeenCalledWith({ where: { id: "target" } });
  });
  it("does not read financial data for unknown detail user", async () => {
    mocks.user.findUnique.mockResolvedValue(null);
    expect(await adminService.user("missing", { page: 1, pageSize: 25 })).toBeNull();
    expect(mocks.transaction.findMany).not.toHaveBeenCalled();
    expect(mocks.transaction.groupBy).not.toHaveBeenCalled();
  });
  it("groups monthly rows without loading all transactions", async () => {
    mocks.$queryRaw.mockResolvedValue([
      { month: new Date("2026-09-01"), type: "INCOME", total: new Prisma.Decimal("50") },
      { month: new Date("2026-09-01"), type: "EXPENSE", total: new Prisma.Decimal("20") },
    ]);
    expect(await adminRepository.monthlySeries()).toEqual([{ month: "2026-09", income: "50.00", expense: "20.00" }]);
    expect(mocks.transaction.findMany).not.toHaveBeenCalled();
  });
});

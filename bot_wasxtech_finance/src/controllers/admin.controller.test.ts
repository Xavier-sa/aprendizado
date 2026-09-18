import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ session: vi.fn(), role: vi.fn(), dashboard: vi.fn(),
  users: vi.fn(), transactions: vi.fn(), user: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession: mocks.session } } }));
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findUnique: mocks.role } } }));
vi.mock("@/services/admin.service", () => ({ adminService: {
  dashboard: mocks.dashboard, users: mocks.users, transactions: mocks.transactions, user: mocks.user,
} }));
import { GET as dashboard } from "@/app/api/admin/dashboard/route";
import { GET as users } from "@/app/api/admin/users/route";
import { GET as transactions } from "@/app/api/admin/transactions/route";
import { GET as user } from "@/app/api/admin/users/[id]/route";
const request = (query = "") => new Request(`http://localhost:3000/api/admin/users${query}`);
const detail = (req: Request) => user(req, { params: Promise.resolve({ id: "target" }) });
beforeEach(() => {
  vi.resetAllMocks();
  mocks.session.mockResolvedValue({ user: { id: "admin", role: "ADMIN" },
    session: { expiresAt: new Date(Date.now() + 60_000) } });
  mocks.role.mockResolvedValue({ role: "USER" });
  mocks.dashboard.mockResolvedValue({ summary: { users: 2 }, monthly: [] });
  mocks.users.mockResolvedValue({ items: [], total: 0, page: 1, pageSize: 25 });
  mocks.transactions.mockResolvedValue({ items: [], total: 0, page: 1, pageSize: 25 });
  mocks.user.mockResolvedValue({ user: { id: "target" } });
});
describe("actual administrative route handlers", () => {
  it.each([dashboard, users, transactions, detail])("rejects USER before any global service call", async (handler) => {
    expect((await handler(request())).status).toBe(403);
    for (const service of [mocks.dashboard, mocks.users, mocks.transactions, mocks.user]) expect(service).not.toHaveBeenCalled();
  });
  it.each([dashboard, users, transactions, detail])("rejects absent/forged session", async (handler) => {
    mocks.session.mockResolvedValue(null);
    expect((await handler(request())).status).toBe(401);
    expect(mocks.role).not.toHaveBeenCalled();
  });
  it.each([dashboard, users, transactions, detail])("allows ADMIN and prevents caching", async (handler) => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    const response = await handler(request());
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
  it("revocation blocks the next request despite stale ADMIN session", async () => {
    mocks.role.mockResolvedValueOnce({ role: "ADMIN" }).mockResolvedValue({ role: "USER" });
    expect((await users(request())).status).toBe(200);
    expect((await users(request())).status).toBe(403);
    expect(mocks.users).toHaveBeenCalledTimes(1);
  });
  it.each(["?pageSize=101", "?page=0", "?page=1&page=2", "?role=ADMIN", "?page=1.5"])("rejects invalid users filters %s", async (query) => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    expect((await users(request(query))).status).toBe(400);
    expect(mocks.users).not.toHaveBeenCalled();
  });
  it.each(["?from=2026-02-30", "?from=2026-09-30&to=2026-09-01", "?type=ADMIN", "?pageSize=100000"])("rejects invalid transaction filters %s", async (query) => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    expect((await transactions(request(query))).status).toBe(400);
    expect(mocks.transactions).not.toHaveBeenCalled();
  });
  it("passes validated transaction filters and pagination", async () => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    const response = await transactions(request("?userId=target&type=EXPENSE&categoryId=cat&from=2026-09-01&to=2026-09-30&page=2&pageSize=10&search=mercado"));
    expect(response.status).toBe(200);
    expect(mocks.transactions).toHaveBeenCalledWith({ userId: "target", type: "EXPENSE", categoryId: "cat",
      from: "2026-09-01", to: "2026-09-30", page: 2, pageSize: 10, search: "mercado" });
  });
  it("returns 404 for unknown user", async () => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    mocks.user.mockResolvedValue(null);
    expect((await detail(request())).status).toBe(404);
  });
  it("does not expose connection errors", async () => {
    mocks.role.mockRejectedValue(new Error("private database details"));
    const response = await users(request());
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain("private database details");
    expect(mocks.users).not.toHaveBeenCalled();
  });
});

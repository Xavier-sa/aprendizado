import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({ getSession: vi.fn(), findUnique: vi.fn(), redirect: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession: mocks.getSession } } }));
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findUnique: mocks.findUnique } } }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import { getAdminAccess, requireAdminApi } from "./admin-access";
import { proxy, config } from "@/proxy";
import AdminPage from "@/app/admin/page";
import AdminLayout from "@/app/admin/layout";
import { GET, POST, PATCH, DELETE, PUT, HEAD, OPTIONS } from "@/app/api/admin/[[...path]]/route";

beforeEach(() => {
  vi.resetAllMocks();
  mocks.getSession.mockResolvedValue({ user: { id: "user-1", role: "ADMIN" },
    session: { expiresAt: new Date(Date.now() + 60_000) } });
  mocks.findUnique.mockResolvedValue({ role: "USER" });
  mocks.redirect.mockImplementation((url: string) => { throw new Error(`redirect:${url}`); });
});
const request = (path: string) => new NextRequest(`http://localhost:3000${path}`, {
  headers: { Cookie: "better-auth.session_token=forged", "x-user-role": "ADMIN" },
});

describe("administrative authorization", () => {
  it.each([GET, POST, PATCH, DELETE, PUT, HEAD, OPTIONS])("blocks USER on every namespace API method", async (handler) => {
    expect((await handler(request("/api/admin/users"))).status).toBe(403);
  });
  it.each(["/admin", "/admin/users", "/admin/users/123", "/api/admin", "/api/admin/users/123"])("protects %s in proxy", async (path) => {
    const response = await proxy(request(path));
    if (path.startsWith("/api/")) expect(response.status).toBe(403);
    else expect(response.headers.get("location")).toBe("http://localhost:3000/dashboard");
  });
  it("blocks USER in the server page and layout even without proxy", async () => {
    await expect(AdminPage()).rejects.toThrow("redirect:/dashboard");
    await expect(AdminLayout({ children: "private" })).rejects.toThrow("redirect:/dashboard");
  });
  it("blocks absent/forged sessions before querying user role", async () => {
    mocks.getSession.mockResolvedValue(null);
    expect((await requireAdminApi(request("/api/admin")))?.status).toBe(401);
    await expect(AdminPage()).rejects.toThrow("redirect:/sign-in");
    expect((await proxy(request("/admin"))).headers.get("location")).toContain("/sign-in");
    expect((await proxy(request("/api/admin"))).status).toBe(401);
    expect(mocks.findUnique).not.toHaveBeenCalled();
  });
  it("blocks expired sessions and deleted users", async () => {
    mocks.getSession.mockResolvedValueOnce({ user: { id: "user-1", role: "ADMIN" },
      session: { expiresAt: new Date(Date.now() - 1) } });
    expect(await getAdminAccess(new Headers())).toEqual({ status: 401 });
    expect(mocks.findUnique).not.toHaveBeenCalled();
    mocks.findUnique.mockResolvedValue(null);
    expect(await getAdminAccess(new Headers())).toEqual({ status: 401 });
  });
  it("allows current database ADMIN regardless of client/session role", async () => {
    mocks.findUnique.mockResolvedValue({ role: "ADMIN" });
    mocks.getSession.mockResolvedValue({ user: { id: "user-1", role: "USER" },
      session: { expiresAt: new Date(Date.now() + 60_000) } });
    expect(await getAdminAccess(new Headers())).toEqual({ status: 200, userId: "user-1" });
    expect(await requireAdminApi(request("/api/admin"))).toBeNull();
    expect(await AdminPage()).toBeTruthy();
    expect(await AdminLayout({ children: "allowed" })).toMatchObject({ props: {
      children: "allowed", admin: true,
    } });
    expect((await proxy(request("/admin"))).headers.get("x-middleware-next")).toBe("1");
    // Namespace has no implemented administrative resource yet.
    expect((await GET(request("/api/admin"))).status).toBe(404);
    expect(mocks.findUnique).toHaveBeenCalledWith({ where: { id: "user-1" }, select: { role: true } });
    expect(mocks.getSession).toHaveBeenCalledWith(expect.objectContaining({ query: { disableCookieCache: true } }));
  });
  it("revokes access immediately even when session still says ADMIN", async () => {
    mocks.findUnique.mockResolvedValueOnce({ role: "ADMIN" }).mockResolvedValue({ role: "USER" });
    expect(await requireAdminApi(request("/api/admin"))).toBeNull();
    expect((await requireAdminApi(request("/api/admin")))?.status).toBe(403);
    await expect(AdminPage()).rejects.toThrow("redirect:/dashboard");
  });
  it("fails closed on database failure", async () => {
    mocks.findUnique.mockRejectedValue(new Error("database unavailable"));
    await expect(GET(request("/api/admin"))).rejects.toThrow("database unavailable");
    await expect(AdminPage()).rejects.toThrow("database unavailable");
  });
  it("matches both administrative namespaces", () => {
    expect(config.matcher).toContain("/admin/:path*");
    expect(config.matcher).toContain("/api/admin/:path*");
  });
});

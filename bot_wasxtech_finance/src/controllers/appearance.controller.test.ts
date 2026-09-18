import { beforeEach, describe, expect, it, vi } from "vitest";
import { betterAuth } from "better-auth";
import { memoryAdapter, type MemoryDB } from "better-auth/adapters/memory";
import { rolePolicy } from "@/lib/auth-policy";
import type { Theme } from "@/lib/themes";

const mocks = vi.hoisted(() => ({ getSession: vi.fn(), findUnique: vi.fn(), upsert: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession: mocks.getSession } } }));
vi.mock("@/lib/prisma", () => ({ prisma: { userPreference: { findUnique: mocks.findUnique, upsert: mocks.upsert } } }));
import { GET, PATCH } from "@/app/api/settings/appearance/route";

let authDB: MemoryDB;
function createAuth() {
  authDB = { user: [], account: [], session: [], verification: [] };
  return betterAuth({ ...rolePolicy, database: memoryAdapter(authDB),
    baseURL: "http://localhost:3000", secret: "test-only-appearance-secret-at-least-32-characters",
    emailAndPassword: { enabled: true }, rateLimit: { enabled: false } });
}
let auth: ReturnType<typeof createAuth>;
let preferences: Map<string, Theme>;
let cookieA: string;
let cookieB: string;
let userA: string;
let userB: string;
async function authPost(endpoint: string, body: object, cookie?: string) {
  return auth.handler(new Request(`http://localhost:3000/api/auth/${endpoint}`, {
    method: "POST", headers: { Origin: "http://localhost:3000", "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body),
  }));
}
const cookieFrom = (response: Response) => response.headers.get("set-cookie")!.split(";")[0];
function req(cookie?: string, body?: unknown, origin: string | null = "http://localhost:3000") {
  return new Request("http://localhost:3000/api/settings/appearance", {
    method: body === undefined ? "GET" : "PATCH",
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...(origin ? { Origin: origin } : {}) },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
}
beforeEach(async () => {
  vi.resetAllMocks();
  auth = createAuth();
  preferences = new Map();
  mocks.getSession.mockImplementation((options) => auth.api.getSession(options));
  mocks.findUnique.mockImplementation(async ({ where }: { where: { userId: string } }) => {
    const theme = preferences.get(where.userId);
    return theme ? { theme } : null;
  });
  mocks.upsert.mockImplementation(async ({ where, update }: { where: { userId: string }; update: { theme: Theme } }) => {
    preferences.set(where.userId, update.theme); return { theme: update.theme };
  });
  const a = await authPost("sign-up/email", { name: "A", email: "a@example.com", password: "Test-password-123" });
  const b = await authPost("sign-up/email", { name: "B", email: "b@example.com", password: "Test-password-123" });
  cookieA = cookieFrom(a); cookieB = cookieFrom(b);
  userA = (await a.json()).user.id; userB = (await b.json()).user.id;
});

describe("appearance API with real Better Auth sessions and owner-scoped repository", () => {
  it("persists A's choice across logout/login while B remains Papiro", async () => {
    expect((await PATCH(req(cookieA, { theme: "ESMERALDA" }))).status).toBe(200);
    expect(await (await GET(req(cookieB))).json()).toEqual({ theme: "PAPIRO" });
    expect(await (await GET(req(cookieA))).json()).toEqual({ theme: "ESMERALDA" });
    await authPost("sign-out", {}, cookieA);
    expect((await GET(req(cookieA))).status).toBe(401);
    const login = await authPost("sign-in/email", { email: "a@example.com", password: "Test-password-123" });
    expect(login.status).toBe(200);
    expect(await (await GET(req(cookieFrom(login)))).json()).toEqual({ theme: "ESMERALDA" });
    expect(preferences.has(userB)).toBe(false);
    expect(mocks.upsert).toHaveBeenCalledWith({ where: { userId: userA }, create: { userId: userA, theme: "ESMERALDA" },
      update: { theme: "ESMERALDA" }, select: { theme: true } });
  });
  it.each([{ theme: "ESMERALDA", userId: "victim" }, { theme: "OCEANO", role: "ADMIN" },
    { theme: "arbitrary" }, { theme: "GRAFITE", updatedAt: "2026-01-01" },
    { theme: "PAPIRO", user: { id: "victim" } }])("rejects unsupported fields/values: %j", async (body) => {
    expect((await PATCH(req(cookieA, body))).status).toBe(400);
    expect(preferences.size).toBe(0);
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("rejects cross-account query targeting", async () => {
    const response = await GET(new Request(`http://localhost:3000/api/settings/appearance?userId=${userB}`, { headers: { Cookie: cookieA } }));
    expect(response.status).toBe(400);
    expect(mocks.findUnique).not.toHaveBeenCalled();
  });
  it("ADMIN saves their own preference without changing another account", async () => {
    authDB.user.find((user) => user.id === userA).role = "ADMIN";
    expect((await PATCH(req(cookieA, { theme: "GRAFITE" }))).status).toBe(200);
    expect(preferences.get(userA)).toBe("GRAFITE");
    expect(await (await GET(req(cookieB))).json()).toEqual({ theme: "PAPIRO" });
  });
  it("rejects cross-site fetch metadata even with a claimed matching origin", async () => {
    const request = req(cookieA, { theme: "GRAFITE" });
    request.headers.set("Sec-Fetch-Site", "cross-site");
    expect((await PATCH(request)).status).toBe(403);
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it.each([undefined, "better-auth.session_token=forged"])("blocks absent/forged sessions %s", async (cookie) => {
    expect((await GET(req(cookie))).status).toBe(401);
    expect((await PATCH(req(cookie, { theme: "OCEANO" }))).status).toBe(401);
    expect(mocks.findUnique).not.toHaveBeenCalled();
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("blocks an expired session before persistence", async () => {
    mocks.getSession.mockResolvedValue({ user: { id: userA }, session: { expiresAt: new Date(Date.now() - 1) } });
    expect((await PATCH(req(cookieA, { theme: "GRAFITE" }))).status).toBe(401);
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it.each(["https://attacker.example", null, "null"])("rejects mutation origin %s", async (origin) => {
    expect((await PATCH(req(cookieA, { theme: "GRAFITE" }, origin))).status).toBe(403);
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
  it("restores Papiro and uses private no-store responses", async () => {
    await PATCH(req(cookieA, { theme: "GRAFITE" }));
    const reset = await PATCH(req(cookieA, { theme: "PAPIRO" }));
    expect(await reset.json()).toEqual({ theme: "PAPIRO" });
    expect(reset.headers.get("cache-control")).toBe("no-store");
    expect((await GET(req(cookieA))).headers.get("cache-control")).toBe("no-store");
  });
  it("does not leak database errors or write after a failed read", async () => {
    mocks.findUnique.mockRejectedValue(new Error("private database connection"));
    const response = await GET(req(cookieA));
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain("private database");
    expect(mocks.upsert).not.toHaveBeenCalled();
  });
});

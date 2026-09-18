import { beforeEach, describe, expect, it } from "vitest";
import { betterAuth } from "better-auth";
import { memoryAdapter, type MemoryDB } from "better-auth/adapters/memory";
import { rolePolicy } from "./auth-policy";

let db: MemoryDB;
let auth: ReturnType<typeof createTestAuth>;
function createTestAuth(database: MemoryDB) {
  return betterAuth({
    ...rolePolicy,
    database: memoryAdapter(database),
    baseURL: "http://localhost:3000",
    secret: "test-only-auth-policy-secret-with-at-least-32-characters",
    emailAndPassword: { enabled: true },
    rateLimit: { enabled: false },
  });
}
beforeEach(() => {
  db = { user: [], session: [], account: [], verification: [] };
  auth = createTestAuth(db);
});

async function post(path: string, body: object, cookie?: string) {
  return auth.handler(new Request(`http://localhost:3000/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:3000",
      ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body),
  }));
}
const registration = { name: "Test User", email: "test@example.com", password: "Test-password-123" };

describe("Better Auth real handler: server-owned role", () => {
  it.each(["ADMIN", "USER", "", null])("rejects signup role=%s before creating any user", async (role) => {
    const response = await post("sign-up/email", { ...registration, role });
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ code: "ROLE_READ_ONLY" });
    expect(db.user).toHaveLength(0);
    expect(db.account).toHaveLength(0);
  });

  it("registers USER and rejects self-promotion while permitting a normal profile update", async () => {
    const signup = await post("sign-up/email", registration);
    expect(signup.status).toBe(200);
    expect(db.user[0].role).toBe("USER");
    const cookie = signup.headers.get("set-cookie")!.split(";")[0];
    const rejected = await post("update-user", { role: "ADMIN", name: "Escalated" }, cookie);
    expect(rejected.status).toBe(400);
    expect(await rejected.json()).toMatchObject({ code: "ROLE_READ_ONLY" });
    expect(db.user[0]).toMatchObject({ role: "USER", name: registration.name });
    const accepted = await post("update-user", { name: "Updated" }, cookie);
    expect(accepted.status).toBe(200);
    expect(db.user[0]).toMatchObject({ role: "USER", name: "Updated" });
  });

  it("rejects forged cookies and expired real sessions", async () => {
    const signup = await post("sign-up/email", registration);
    const cookie = signup.headers.get("set-cookie")!.split(";")[0];
    expect(await auth.api.getSession({ headers: new Headers({ Cookie: "better-auth.session_token=forged" }) })).toBeNull();
    expect(await auth.api.getSession({ headers: new Headers({ Cookie: cookie }) })).not.toBeNull();
    db.session[0].expiresAt = new Date(Date.now() - 60_000);
    expect(await auth.api.getSession({ headers: new Headers({ Cookie: cookie }),
      query: { disableCookieCache: true } })).toBeNull();
  });
});

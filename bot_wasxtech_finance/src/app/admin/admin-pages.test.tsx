import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const mocks = vi.hoisted(() => ({ session: vi.fn(), role: vi.fn(), dashboard: vi.fn(),
  users: vi.fn(), transactions: vi.fn(), user: vi.fn(), pathname: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession: mocks.session } } }));
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findUnique: mocks.role } } }));
vi.mock("@/repositories/preference.repository", () => ({ preferenceRepository: { get: async () => "PAPIRO" } }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => { throw new Error(`redirect:${url}`); },
  notFound: () => { throw new Error("not-found"); },
  usePathname: mocks.pathname,
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));
vi.mock("@/services/admin.service", () => ({ adminService: {
  dashboard: mocks.dashboard, users: mocks.users, transactions: mocks.transactions, user: mocks.user,
} }));
import Dashboard from "./page";
import Users from "./users/page";
import Transactions from "./transactions/page";
import User from "./users/[id]/page";
import Layout from "./layout";

const emptyQuery = Promise.resolve({});
const pages = [
  { name: "dashboard", render: () => Dashboard() },
  { name: "users", render: () => Users({ searchParams: emptyQuery }) },
  { name: "transactions", render: () => Transactions({ searchParams: emptyQuery }) },
  { name: "user", render: () => User({ params: Promise.resolve({ id: "target" }), searchParams: emptyQuery }) },
];
beforeEach(() => {
  vi.resetAllMocks();
  mocks.pathname.mockReturnValue("/admin");
  mocks.session.mockResolvedValue({ user: { id: "admin", role: "ADMIN" },
    session: { expiresAt: new Date(Date.now() + 60_000) } });
  mocks.role.mockResolvedValue({ role: "USER" });
  const summary = { users: 2, transactions: 51, income: "12345.67", expense: "2345.67", volume: "14691.34", balance: "10000.00" };
  const user = { id: "target", name: "Usuário de demonstração com nome extenso", email: `${"usuario".repeat(10)}@example.com`,
    role: "USER", createdAt: new Date("2026-09-01"), _count: { transactions: 51 } };
  const transactions = { items: [{ id: "t1", description: "Compra registrada com uma descrição bastante extensa para verificar a quebra de linhas nos cartões administrativos",
    amount: "2345.67", type: "EXPENSE", transactionDate: new Date("2026-09-15"),
    category: { id: "categoria-demonstracao", name: "Despesas de demonstração" }, user }], total: 51, page: 1, pageSize: 25 };
  mocks.dashboard.mockResolvedValue({ summary, monthly: [{ month: "2026-09", income: "12345.67", expense: "2345.67" }] });
  mocks.users.mockResolvedValue({ items: [user], total: 51, page: 1, pageSize: 25 });
  mocks.transactions.mockResolvedValue(transactions);
  mocks.user.mockResolvedValue({ user, summary, transactions });
});
describe("server administrative pages", () => {
  it.each(pages)("blocks USER on $name before data access", async ({ render }) => {
    await expect(render()).rejects.toThrow("redirect:/dashboard");
    for (const service of [mocks.dashboard, mocks.users, mocks.transactions, mocks.user]) expect(service).not.toHaveBeenCalled();
  });
  it.each(pages)("blocks absent session on $name", async ({ render }) => {
    mocks.session.mockResolvedValue(null);
    await expect(render()).rejects.toThrow("redirect:/sign-in");
    expect(mocks.role).not.toHaveBeenCalled();
  });
  it.each(pages)("allows ADMIN on $name with the common responsive Shell", async ({ render, name }) => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    mocks.pathname.mockReturnValue(name === "dashboard" ? "/admin" : name === "user" ? "/admin/users/target" : `/admin/${name}`);
    const content = await render();
    const html = renderToStaticMarkup(await Layout({ children: content }));
    expect(html).toContain("Administração");
    expect(html).toContain("/admin/users");
    if (process.env.FINANCEBOT_UI_FIXTURES === "1") {
      const staticRoot = path.resolve(".next/static");
      const css = readdirSync(staticRoot, { recursive: true }).filter((file) => String(file).endsWith(".css"))
        .map((file) => readFileSync(path.join(staticRoot, String(file)), "utf8")).join("\n");
      const preview = path.resolve(".vercel/phase3-preview");
      mkdirSync(preview, { recursive: true });
      const check = `<script>requestAnimationFrame(() => { const width = innerWidth; const overflow = [...document.querySelectorAll('body *')].filter(e => { const r=e.getBoundingClientRect(); return r.width && (r.right > width+1 || r.left < -1); }).map(e => e.tagName+':'+e.className); document.body.dataset.viewport = width; document.body.dataset.overflow = JSON.stringify(overflow); });</script>`;
      writeFileSync(path.join(preview, `${name}.html`), `<!doctype html><html lang="pt-BR" class="h-full antialiased"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style></head><body class="min-h-full flex flex-col">${html}${check}</body></html>`);
    }
  });
  it("does not query on invalid filters", async () => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    await Transactions({ searchParams: Promise.resolve({ pageSize: "999999" }) });
    expect(mocks.transactions).not.toHaveBeenCalled();
  });
  it("uses notFound for an unknown user", async () => {
    mocks.role.mockResolvedValue({ role: "ADMIN" });
    mocks.user.mockResolvedValue(null);
    await expect(User({ params: Promise.resolve({ id: "missing" }), searchParams: emptyQuery })).rejects.toThrow("not-found");
  });
});

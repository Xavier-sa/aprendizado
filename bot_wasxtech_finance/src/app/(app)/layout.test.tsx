import { beforeEach, describe, expect, it, vi } from "vitest";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const mocks = vi.hoisted(() => ({ session: vi.fn(), user: vi.fn(), preference: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: { api: { getSession: mocks.session } } }));
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findUnique: mocks.user } } }));
vi.mock("@/repositories/preference.repository", () => ({ preferenceRepository: { get: mocks.preference } }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => { throw new Error(`redirect:${url}`); },
  usePathname: () => "/dashboard",
}));
vi.mock("next/link", () => ({ default: ({ children, ...props }: { children: ReactNode }) => createElement("a", props, children) }));
vi.mock("@/components/layout/LogoutButton", () => ({ LogoutButton: () => null }));
import AppLayout from "./layout";

beforeEach(() => {
  vi.resetAllMocks();
  mocks.session.mockResolvedValue({ user: { id: "current-user", role: "ADMIN" },
    session: { expiresAt: new Date(Date.now() + 60_000) } });
  mocks.user.mockResolvedValue({ role: "USER" });
  mocks.preference.mockResolvedValue("PAPIRO");
});
const render = async () => renderToStaticMarkup(await AppLayout({ children: "Dashboard" }));
describe("administrative shortcut in personal navigation", () => {
  it("hides the shortcut for current USER despite an ADMIN role in the session", async () => {
    expect(await render()).not.toContain('href="/admin"');
    expect(mocks.user).toHaveBeenCalledWith({ where: { id: "current-user" }, select: { role: true } });
  });
  it("shows a shield shortcut in desktop and mobile for current ADMIN", async () => {
    mocks.user.mockResolvedValue({ role: "ADMIN" });
    const html = await render();
    expect(html.match(/href="\/admin"/g)).toHaveLength(2);
    expect(html).toContain("Administração");
    expect(html).toContain('aria-label="Administração"');
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(2);
    expect(html).toContain('href="/dashboard"');
  });
  it("removes the shortcut on the next render after role revocation", async () => {
    mocks.user.mockResolvedValueOnce({ role: "ADMIN" }).mockResolvedValue({ role: "USER" });
    expect(await render()).toContain('href="/admin"');
    expect(await render()).not.toContain('href="/admin"');
  });
  it("redirects an absent session before querying role or preferences", async () => {
    mocks.session.mockResolvedValue(null);
    await expect(render()).rejects.toThrow("redirect:/sign-in");
    expect(mocks.user).not.toHaveBeenCalled();
    expect(mocks.preference).not.toHaveBeenCalled();
  });
  it("redirects when the authenticated account no longer exists", async () => {
    mocks.user.mockResolvedValue(null);
    await expect(render()).rejects.toThrow("redirect:/sign-in");
  });
});

import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { getAdminAccess } from "@/lib/admin-access";

const PROTECTED_PAGES = ["/dashboard", "/chat", "/transactions"];
const PROTECTED_API_PREFIXES = [
  "/api/transactions",
  "/api/dashboard",
  "/api/chat",
  "/api/categories",
];
const AUTH_PAGES = ["/sign-in", "/sign-up"];

/**
 * Camada rápida de autenticação (Next.js 16 renomeou middleware -> proxy).
 * Nas rotas comuns, só confere a EXISTÊNCIA do cookie — não valida no banco, para
 * não bloquear toda requisição com uma consulta extra (ver doc do Better
 * Auth). A verificação de sessão real (e o isolamento por usuário) fica
 * por conta de cada controller/repository, que é a fonte da verdade.
 * Rotas administrativas validam sessão e papel atual no banco antes de permitir acesso.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname === "/api/admin" || pathname.startsWith("/api/admin/");
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdminApi || isAdminPage) {
    const access = await getAdminAccess(request.headers);
    if (access.status === 200) return NextResponse.next();
    if (isAdminApi) {
      return NextResponse.json({ error: access.status === 401 ? "Não autenticado" : "Acesso negado" },
        { status: access.status, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.redirect(new URL(access.status === 401 ? "/sign-in" : "/dashboard", request.url));
  }
  const hasSessionCookie = Boolean(getSessionCookie(request));

  if (hasSessionCookie) {
    // Quem já está logado não precisa ver o formulário de entrar/cadastrar.
    if (AUTH_PAGES.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const isProtectedApi = PROTECTED_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (isProtectedApi) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const isProtectedPage = PROTECTED_PAGES.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`),
  );
  if (isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/dashboard/:path*",
    "/chat/:path*",
    "/transactions/:path*",
    "/sign-in",
    "/sign-up",
    "/api/transactions/:path*",
    "/api/dashboard/:path*",
    "/api/chat/:path*",
    "/api/categories/:path*",
  ],
};

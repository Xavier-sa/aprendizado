import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

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
 * Só confere a EXISTÊNCIA do cookie de sessão — não valida no banco, para
 * não bloquear toda requisição com uma consulta extra (ver doc do Better
 * Auth). A verificação de sessão real (e o isolamento por usuário) fica
 * por conta de cada controller/repository, que é a fonte da verdade.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

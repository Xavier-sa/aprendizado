import { auth } from "@/lib/auth";

/**
 * Fonte da verdade para autenticação em cada request — o proxy (ver
 * src/proxy.ts) só confere a existência do cookie por performance; aqui é
 * onde a sessão é validada de fato antes de tocar em dados de um usuário.
 */
export async function getUserId(request: Request): Promise<string | null> {
  return getAuthenticatedUserId(request.headers);
}

export async function getAuthenticatedUserId(headers: Headers): Promise<string | null> {
  const session = await auth.api.getSession({ headers, query: { disableCookieCache: true } });
  if (!session || !(new Date(session.session.expiresAt).getTime() > Date.now())) return null;
  return session?.user.id ?? null;
}

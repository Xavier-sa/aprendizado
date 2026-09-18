import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type AdminAccess = { status: 200; userId: string } | { status: 401 | 403 };

/** Never authorize from the role returned by a session or a client cache. */
export async function getAdminAccess(headers: Headers): Promise<AdminAccess> {
  const session = await auth.api.getSession({
    headers,
    query: { disableCookieCache: true },
  });
  if (!session || !(new Date(session.session.expiresAt).getTime() > Date.now())) {
    return { status: 401 };
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (!user) return { status: 401 };
  if (user.role !== "ADMIN") return { status: 403 };
  return { status: 200, userId: session.user.id };
}

/** Call before any administrative API reads or writes. Failures fail closed. */
export async function requireAdminApi(request: Request) {
  const access = await getAdminAccess(request.headers);
  if (access.status === 200) return null;
  return NextResponse.json(
    { error: access.status === 401 ? "Não autenticado" : "Acesso negado" },
    { status: access.status, headers: { "Cache-Control": "no-store" } },
  );
}

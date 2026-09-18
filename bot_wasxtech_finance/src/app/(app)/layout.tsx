import type { ReactNode } from "react";
import { Shell } from "@/components/layout/Shell";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/session";
import { preferenceRepository } from "@/repositories/preference.repository";
import { ThemeProvider } from "@/components/appearance/ThemeProvider";
import { prisma } from "@/lib/prisma";

/** Envolve só as páginas autenticadas (dashboard/chat/transações) com a
 * navegação (Sidebar/MobileNav) — a landing e as telas de auth não usam. */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const userId = await getAuthenticatedUserId(await headers());
  if (!userId) redirect("/sign-in");
  const [theme, user] = await Promise.all([
    preferenceRepository.get(userId),
    prisma.user.findUnique({ where: { id: userId }, select: { role: true } }),
  ]);
  if (!user) redirect("/sign-in");
  return <ThemeProvider key={userId} initialTheme={theme}><Shell canAccessAdmin={user.role === "ADMIN"}>{children}</Shell></ThemeProvider>;
}

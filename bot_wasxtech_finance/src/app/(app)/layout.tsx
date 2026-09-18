import type { ReactNode } from "react";
import { Shell } from "@/components/layout/Shell";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/session";
import { preferenceRepository } from "@/repositories/preference.repository";
import { ThemeProvider } from "@/components/appearance/ThemeProvider";

/** Envolve só as páginas autenticadas (dashboard/chat/transações) com a
 * navegação (Sidebar/MobileNav) — a landing e as telas de auth não usam. */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const userId = await getAuthenticatedUserId(await headers());
  if (!userId) redirect("/sign-in");
  const theme = await preferenceRepository.get(userId);
  return <ThemeProvider key={userId} initialTheme={theme}><Shell>{children}</Shell></ThemeProvider>;
}

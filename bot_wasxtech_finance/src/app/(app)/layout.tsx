import type { ReactNode } from "react";
import { Shell } from "@/components/layout/Shell";

/** Envolve só as páginas autenticadas (dashboard/chat/transações) com a
 * navegação (Sidebar/MobileNav) — a landing e as telas de auth não usam. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}

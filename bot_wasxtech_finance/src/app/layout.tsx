import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceBot",
  description: "Gestão financeira pessoal conversacional",
};

/**
 * Layout raiz "nu" — a navegação (Sidebar/MobileNav) só aparece nas
 * páginas autenticadas, ver src/app/(app)/layout.tsx. Landing (`/`) e
 * telas de autenticação (`/sign-in`, `/sign-up`) cuidam do próprio layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

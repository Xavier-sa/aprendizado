import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "FinanceBot",
  description: "Gestão financeira pessoal conversacional",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

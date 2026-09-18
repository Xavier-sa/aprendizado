import type { ReactNode } from "react";
import { requireAdminPage } from "@/lib/admin-page";
import { Shell } from "@/components/layout/Shell";
import { preferenceRepository } from "@/repositories/preference.repository";
import { ThemeProvider } from "@/components/appearance/ThemeProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { userId } = await requireAdminPage();
  const theme = await preferenceRepository.get(userId);
  return <ThemeProvider key={userId} initialTheme={theme}><Shell admin>{children}</Shell></ThemeProvider>;
}

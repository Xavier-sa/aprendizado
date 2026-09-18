import type { ReactNode } from "react";
import { requireAdminPage } from "@/lib/admin-page";
import { Shell } from "@/components/layout/Shell";
export const dynamic = "force-dynamic";
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminPage();
  return <Shell admin>{children}</Shell>;
}

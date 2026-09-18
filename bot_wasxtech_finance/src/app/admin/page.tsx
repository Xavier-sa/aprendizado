import { requireAdminPage } from "@/lib/admin-page";
export default async function AdminPage() {
  await requireAdminPage();
  return <p>Área administrativa protegida.</p>;
}

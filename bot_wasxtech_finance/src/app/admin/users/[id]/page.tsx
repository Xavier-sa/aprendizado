import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/admin-page";
import { adminService } from "@/services/admin.service";
import { adminTransactionsSchema, type AdminSearchParams } from "@/schemas/admin.schema";
import { AdminFilters, AdminHeading, AdminPagination, AdminSummary, AdminTransactions, InvalidAdminFilters } from "@/components/admin/AdminViews";

export default async function AdminUserPage({ params, searchParams }: {
  params: Promise<{ id: string }>; searchParams: Promise<AdminSearchParams>;
}) {
  await requireAdminPage();
  const { id } = await params;
  const query = await searchParams;
  const parsed = adminTransactionsSchema.safeParse(query);
  if (!parsed.success) return <InvalidAdminFilters />;
  const data = await adminService.user(id, parsed.data);
  if (!data) notFound();
  const path = `/admin/users/${encodeURIComponent(id)}`;
  return <div className="flex min-w-0 flex-col gap-6">
    <AdminHeading title={data.user.name} description={`${data.user.email} · ${data.user.role}`} />
    <p className="break-all text-sm text-text-muted">ID do usuário: {data.user.id}</p>
    <AdminSummary summary={data.summary} user />
    <h2 className="font-semibold">Movimentações deste usuário</h2>
    <AdminFilters params={query} transactions fixedUser action={path} />
    <AdminTransactions data={data.transactions} /><AdminPagination data={data.transactions} params={query} path={path} />
  </div>;
}

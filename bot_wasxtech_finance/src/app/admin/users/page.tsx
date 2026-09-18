import Link from "next/link";
import { requireAdminPage } from "@/lib/admin-page";
import { adminService } from "@/services/admin.service";
import { adminUsersSchema, type AdminSearchParams } from "@/schemas/admin.schema";
import { AdminFilters, AdminHeading, AdminPagination, InvalidAdminFilters, dateLabel } from "@/components/admin/AdminViews";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<AdminSearchParams> }) {
  await requireAdminPage();
  const params = await searchParams;
  const parsed = adminUsersSchema.safeParse(params);
  const data = parsed.success ? await adminService.users(parsed.data) : null;
  return <div className="flex min-w-0 flex-col gap-6">
    <AdminHeading title="Usuários cadastrados" description="Consulta de contas para operação e suporte. Nenhuma alteração de papel disponível." />
    <AdminFilters params={params} action="/admin/users" />
    {!data ? <InvalidAdminFilters /> : <>
      {!data.items.length && <p className="text-sm text-text-muted">Nenhum usuário encontrado.</p>}
      <ul className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">{data.items.map((user) =>
        <li key={user.id} className="min-w-0 rounded-lg border border-border bg-surface p-4">
          <Link href={`/admin/users/${encodeURIComponent(user.id)}`} className="break-words font-semibold text-text-primary underline">{user.name}</Link>
          <p className="mt-1 break-all text-sm text-text-muted">{user.email}</p>
          <p className="mt-2 text-sm text-text-muted">{user.role} · Cadastro: {dateLabel(user.createdAt)}</p>
          <p className="text-sm text-text-muted">{user._count.transactions} movimentações</p>
        </li>)}</ul>
      <AdminPagination data={data} params={params} path="/admin/users" />
    </>}
  </div>;
}

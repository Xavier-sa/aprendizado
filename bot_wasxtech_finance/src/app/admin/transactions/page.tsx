import { requireAdminPage } from "@/lib/admin-page";
import { adminService } from "@/services/admin.service";
import { adminTransactionsSchema, type AdminSearchParams } from "@/schemas/admin.schema";
import { AdminFilters, AdminHeading, AdminPagination, AdminTransactions, InvalidAdminFilters } from "@/components/admin/AdminViews";

export default async function AdminTransactionsPage({ searchParams }: { searchParams: Promise<AdminSearchParams> }) {
  await requireAdminPage();
  const params = await searchParams;
  const parsed = adminTransactionsSchema.safeParse(params);
  const data = parsed.success ? await adminService.transactions(parsed.data) : null;
  return <div className="flex min-w-0 flex-col gap-6">
    <AdminHeading title="Movimentações globais" description="Consulta de registros de todos os usuários. Esta área é somente leitura." />
    <AdminFilters params={params} transactions action="/admin/transactions" />
    {!data ? <InvalidAdminFilters /> : <>
      <AdminTransactions data={data} /><AdminPagination data={data} params={params} path="/admin/transactions" />
    </>}
  </div>;
}

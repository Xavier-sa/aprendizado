import { requireAdminPage } from "@/lib/admin-page";
import { adminService } from "@/services/admin.service";
import { AdminHeading, AdminSummary, money } from "@/components/admin/AdminViews";
import { Card, CardTitle } from "@/components/ui/Card";

export default async function AdminPage() {
  await requireAdminPage();
  const { summary, monthly } = await adminService.dashboard();
  return <div className="flex min-w-0 flex-col gap-6">
    <AdminHeading title="Visão geral da plataforma" description="Valores registrados pelos usuários; não representam dinheiro pertencente à plataforma." />
    <AdminSummary summary={summary} />
    <Card><CardTitle>Receitas e despesas · últimos 12 meses</CardTitle>
      <p className="mt-1 text-sm text-text-muted">Agrupamento pela data da movimentação. Meses sem registros são omitidos.</p>
      {!monthly.length ? <p className="mt-4 text-sm text-text-muted">Nenhum registro no período.</p> :
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">{monthly.map((month) =>
          <li key={month.month} className="rounded-md border border-border p-3"><h2 className="font-medium">{month.month}</h2>
            <p className="mt-1 text-sm text-income">Receitas: {money(month.income)}</p>
            <p className="text-sm text-expense">Despesas: {money(month.expense)}</p></li>)}</ul>}
    </Card>
  </div>;
}

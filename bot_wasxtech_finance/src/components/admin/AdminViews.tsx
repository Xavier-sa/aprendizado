import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import type { adminService } from "@/services/admin.service";
import type { AdminSearchParams } from "@/schemas/admin.schema";

type Summary = Awaited<ReturnType<typeof adminService.dashboard>>["summary"];
type Transactions = Awaited<ReturnType<typeof adminService.transactions>>;
export const money = (value: string) => new Intl.NumberFormat("pt-BR", {
  style: "currency", currency: "BRL",
}).format(Number(value));
export const dateLabel = (value: Date | string) => new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
}).format(new Date(value));

export function AdminHeading({ title, description }: { title: string; description: string }) {
  return <header><p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Administração</p>
    <h1 className="mt-1 break-words text-xl font-semibold text-text-primary">{title}</h1>
    <p className="mt-1 break-words text-sm text-text-muted">{description}</p></header>;
}

export function AdminSummary({ summary, user = false }: { summary: Summary; user?: boolean }) {
  const metrics = [
    ...(!user ? [["Usuários cadastrados", String(summary.users)]] : []),
    ["Movimentações registradas", String(summary.transactions)],
    ["Receitas registradas", money(summary.income)],
    ["Despesas registradas", money(summary.expense)],
    ["Volume registrado (receitas + despesas)", money(summary.volume)],
    ...(user ? [["Saldo registrado", money(summary.balance)]] : []),
  ];
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {metrics.map(([label, value]) => <Card key={label}><p className="text-sm text-text-muted">{label}</p>
      <p className="mt-2 break-words text-xl font-semibold text-text-primary">{value}</p></Card>)}
  </div>;
}

const controlButton = "rounded-md border border-border bg-surface-secondary px-4 py-2 text-sm font-medium text-text-primary hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export function AdminFilters({ params, transactions = false, fixedUser = false, action }: {
  params: AdminSearchParams; transactions?: boolean; fixedUser?: boolean; action: string;
}) {
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  return <form action={action} method="get" className="grid min-w-0 grid-cols-1 gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2 xl:grid-cols-3">
    <label className="min-w-0 text-sm text-text-muted">{transactions ? "Descrição" : "Nome ou e-mail"}
      <Input name="search" defaultValue={value("search")} maxLength={200} /></label>
    {transactions && <>
      {!fixedUser && <label className="min-w-0 text-sm text-text-muted">ID do usuário
        <Input name="userId" defaultValue={value("userId")} maxLength={128} /></label>}
      <label className="min-w-0 text-sm text-text-muted">Tipo<Select name="type" defaultValue={value("type")}>
        <option value="">Todos</option><option value="INCOME">Receita</option><option value="EXPENSE">Despesa</option>
      </Select></label>
      <label className="min-w-0 text-sm text-text-muted">ID da categoria
        <Input name="categoryId" defaultValue={value("categoryId")} maxLength={128} /></label>
      <label className="min-w-0 text-sm text-text-muted">De (UTC)<Input type="date" name="from" defaultValue={value("from")} /></label>
      <label className="min-w-0 text-sm text-text-muted">Até (UTC)<Input type="date" name="to" defaultValue={value("to")} /></label>
    </>}
    <div className="flex flex-wrap items-end gap-3"><button type="submit" className={controlButton}>Filtrar</button>
      <Link href={action} className={controlButton}>Limpar</Link></div>
  </form>;
}

export function AdminPagination({ data, path, params }: {
  data: { total: number; page: number; pageSize: number }; path: string; params: AdminSearchParams;
}) {
  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));
  function href(page: number) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (typeof value === "string") query.set(key, value);
    query.set("page", String(page));
    return `${path}?${query}`;
  }
  return <nav aria-label="Paginação" className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
    <p>{data.total} registros · Página {data.page} de {pages}</p>
    <div className="flex gap-3">{data.page > 1 && <Link className={controlButton} href={href(data.page - 1)}>Anterior</Link>}
      {data.page < pages && <Link className={controlButton} href={href(data.page + 1)}>Próxima</Link>}</div>
  </nav>;
}

export function AdminTransactions({ data }: { data: Transactions }) {
  if (!data.items.length) return <p className="rounded-lg border border-border bg-surface p-5 text-sm text-text-muted">Nenhuma movimentação encontrada.</p>;
  return <ul className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
    {data.items.map((item) => <li key={item.id} className="min-w-0 rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2"><h2 className="min-w-0 break-words font-medium text-text-primary">{item.description}</h2>
        <p className={item.type === "INCOME" ? "font-semibold text-income" : "font-semibold text-expense"}>
          {item.type === "INCOME" ? "Receita" : "Despesa"}: {money(item.amount)}</p></div>
      <p className="mt-2 text-sm text-text-muted">{dateLabel(item.transactionDate)} · {item.category.name}</p>
      <Link className="mt-2 block break-all text-sm text-text-primary underline" href={`/admin/users/${encodeURIComponent(item.user.id)}`}>
        {item.user.name} · {item.user.email}</Link>
      <Link className="mt-2 block break-all text-xs text-text-muted underline"
        href={`/admin/transactions?categoryId=${encodeURIComponent(item.category.id)}`}>Filtrar categoria: {item.category.id}</Link>
    </li>)}
  </ul>;
}

export function InvalidAdminFilters() {
  return <p role="alert" className="rounded-lg border border-border bg-surface p-4 text-expense">Filtros inválidos. Verifique as datas e a paginação.</p>;
}

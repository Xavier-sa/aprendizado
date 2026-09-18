"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Filters, type FiltersValue } from "@/components/transactions/Filters";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import {
  TransactionForm,
  type TransactionFormValues,
} from "@/components/transactions/TransactionForm";
import type { CategoryDTO, TransactionDTO } from "@/types";

const EMPTY_FILTERS: FiltersValue = { from: "", to: "", categoryId: "", type: "", search: "" };

/**
 * Data de hoje no fuso do PRÓPRIO navegador (não UTC) — `toISOString()`
 * converte para UTC antes de fatiar a data, então à noite (fuso negativo,
 * ex.: Brasil) ela "adianta" para o dia seguinte. O campo de data de um
 * formulário deve refletir o calendário de quem está preenchendo, então
 * aqui os componentes locais (`getFullYear`/`getMonth`/`getDate`) são o
 * valor certo — diferente de `transactionDate`, que é resolvido no
 * servidor pelo fuso central da aplicação (ver src/lib/dates.ts).
 */
function todayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const EMPTY_NEW_TRANSACTION: TransactionFormValues = {
  description: "",
  amount: "",
  type: "EXPENSE",
  categoryId: "",
  paymentMethod: "",
  transactionDate: todayISODate(),
};

export default function TransactionsPage() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [filters, setFilters] = useState<FiltersValue>(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.type) params.set("type", filters.type);
    if (filters.search) params.set("search", filters.search);

    const response = await fetch(`/api/transactions?${params.toString()}`);
    const data = await response.json();
    setTransactions(data.transactions ?? []);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []));
  }, []);

  useEffect(() => {
    // Busca inicial e a cada mudança de filtro — padrão de data fetching,
    // não um cálculo que poderia ser feito em render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTransactions();
  }, [loadTransactions]);

  async function handleCreate(values: TransactionFormValues) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: values.description,
        amount: Number(values.amount),
        type: values.type,
        categoryId: values.categoryId,
        paymentMethod: values.paymentMethod || null,
        transactionDate: values.transactionDate,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error ?? "Erro ao criar movimentação");
    }
    setCreating(false);
    await loadTransactions();
  }

  async function handleSaveEdit(id: string, values: TransactionFormValues) {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: values.description,
        amount: Number(values.amount),
        type: values.type,
        categoryId: values.categoryId,
        paymentMethod: values.paymentMethod || null,
        transactionDate: values.transactionDate,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error ?? "Erro ao atualizar movimentação");
    }
    setEditingId(null);
    await loadTransactions();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta movimentação?")) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    await loadTransactions();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Movimentações</h1>
          <p className="text-sm text-text-muted">Histórico completo de receitas e despesas.</p>
        </div>
        <Button onClick={() => setCreating((v) => !v)}>
          {creating ? "Fechar" : "Nova movimentação"}
        </Button>
      </div>

      {creating && (
        <TransactionForm
          submitLabel="Adicionar"
          categories={categories}
          initialValues={EMPTY_NEW_TRANSACTION}
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}

      <Filters value={filters} categories={categories} onChange={setFilters} />

      {loading ? (
        <p className="py-8 text-center text-sm text-text-muted">Carregando...</p>
      ) : (
        <TransactionsTable
          transactions={transactions}
          categories={categories}
          editingId={editingId}
          onStartEdit={setEditingId}
          onCancelEdit={() => setEditingId(null)}
          onSaveEdit={handleSaveEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

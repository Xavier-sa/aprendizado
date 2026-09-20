"use client";

import { Button } from "@/components/ui/Button";
import { TypeBadge } from "@/components/ui/Badge";
import { TransactionForm, type TransactionFormValues } from "./TransactionForm";
import { formatCurrencyBRL } from "@/lib/currency";
import { formatDateBR } from "@/lib/dates";
import type { CategoryDTO, TransactionDTO } from "@/types";

interface TransactionsTableProps {
  transactions: TransactionDTO[];
  categories: CategoryDTO[];
  editingId: string | null;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string, values: TransactionFormValues) => Promise<void>;
  onDelete: (id: string) => void;
}

export function TransactionsTable({
  transactions,
  categories,
  editingId,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-muted">
        Nenhuma movimentação encontrada para os filtros selecionados.
      </p>
    );
  }

  function editForm(transaction: TransactionDTO) {
    return (
      <TransactionForm
        submitLabel="Salvar"
        categories={categories}
        onCancel={onCancelEdit}
        onSubmit={(values) => onSaveEdit(transaction.id, values)}
        initialValues={{
          description: transaction.description,
          amount: String(transaction.amount),
          type: transaction.type,
          categoryId: transaction.categoryId,
          paymentMethod: transaction.paymentMethod ?? "",
          transactionDate: transaction.transactionDate.slice(0, 10),
        }}
      />
    );
  }

  return (
    <>
      {/* Abaixo de sm (telas de celular) a tabela de 7 colunas exigiria
          rolagem horizontal mesmo com min-w reduzido — descrição, categoria
          e forma de pagamento não cabem em ~320-430px. Um cartão por
          movimentação evita a rolagem lateral e mantém toda a informação
          visível sem abreviar nada. Da faixa sm em diante o espaço extra
          já comporta a tabela (com rolagem controlada quando necessário). */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {transactions.map((transaction) =>
          editingId === transaction.id ? (
            <li key={transaction.id} className="rounded-lg border border-border bg-surface p-3">
              {editForm(transaction)}
            </li>
          ) : (
            <li key={transaction.id} className="min-w-0 rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="min-w-0 break-words font-medium text-text-primary">
                  {transaction.description}
                </h3>
                <p
                  className={`whitespace-nowrap font-semibold ${
                    transaction.type === "INCOME" ? "text-income" : "text-expense"
                  }`}
                >
                  {formatCurrencyBRL(transaction.amount)}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <TypeBadge type={transaction.type} />
                <span className="text-sm text-text-muted">{transaction.categoryName}</span>
              </div>
              <p className="mt-2 text-sm text-text-muted">
                {formatDateBR(new Date(transaction.transactionDate))}
                {transaction.paymentMethod ? ` · ${transaction.paymentMethod}` : ""}
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="ghost" onClick={() => onStartEdit(transaction.id)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => onDelete(transaction.id)}>
                  Excluir
                </Button>
              </div>
            </li>
          ),
        )}
      </ul>

      <div className="hidden overflow-x-auto rounded-lg border border-border sm:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-surface-secondary text-text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Data</th>
              <th className="px-3 py-2 font-medium">Descrição</th>
              <th className="px-3 py-2 font-medium">Categoria</th>
              <th className="px-3 py-2 font-medium">Tipo</th>
              <th className="px-3 py-2 font-medium">Pagamento</th>
              <th className="px-3 py-2 text-right font-medium">Valor</th>
              <th className="px-3 py-2 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {transactions.map((transaction) =>
              editingId === transaction.id ? (
                <tr key={transaction.id}>
                  <td colSpan={7} className="p-3">
                    {editForm(transaction)}
                  </td>
                </tr>
              ) : (
                <tr key={transaction.id}>
                  <td className="whitespace-nowrap px-3 py-2 text-text-primary">
                    {formatDateBR(new Date(transaction.transactionDate))}
                  </td>
                  <td className="px-3 py-2 text-text-primary">{transaction.description}</td>
                  <td className="px-3 py-2 text-text-primary">{transaction.categoryName}</td>
                  <td className="px-3 py-2">
                    <TypeBadge type={transaction.type} />
                  </td>
                  <td className="px-3 py-2 text-text-muted">
                    {transaction.paymentMethod ?? "—"}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-2 text-right font-medium ${
                      transaction.type === "INCOME" ? "text-income" : "text-expense"
                    }`}
                  >
                    {formatCurrencyBRL(transaction.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => onStartEdit(transaction.id)}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => onDelete(transaction.id)}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

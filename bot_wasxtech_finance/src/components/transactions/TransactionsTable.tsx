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

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
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
  );
}

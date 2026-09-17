"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import type { CategoryDTO, TransactionType } from "@/types";

export interface TransactionFormValues {
  description: string;
  amount: string;
  type: TransactionType;
  categoryId: string;
  paymentMethod: string;
  transactionDate: string; // yyyy-mm-dd
}

interface TransactionFormProps {
  initialValues: TransactionFormValues;
  categories: CategoryDTO[];
  onSubmit: (values: TransactionFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

export function TransactionForm({
  initialValues,
  categories,
  onSubmit,
  onCancel,
  submitLabel,
}: TransactionFormProps) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryOptions = categories.filter((c) => c.type === values.type);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs text-text-muted">Descrição</label>
        <Input
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-text-muted">Valor</label>
        <Input
          type="number"
          step="0.01"
          min="0.01"
          value={values.amount}
          onChange={(e) => setValues({ ...values, amount: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-text-muted">Tipo</label>
        <Select
          value={values.type}
          onChange={(e) =>
            setValues({
              ...values,
              type: e.target.value as TransactionType,
              categoryId: "",
            })
          }
        >
          <option value="EXPENSE">Despesa</option>
          <option value="INCOME">Receita</option>
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-text-muted">Categoria</label>
        <Select
          value={values.categoryId}
          onChange={(e) => setValues({ ...values, categoryId: e.target.value })}
          required
        >
          <option value="">Selecione</option>
          {categoryOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-text-muted">Data</label>
        <Input
          type="date"
          value={values.transactionDate}
          onChange={(e) => setValues({ ...values, transactionDate: e.target.value })}
          required
        />
      </div>

      <div className="lg:col-span-6">
        <label className="mb-1 block text-xs text-text-muted">
          Forma de pagamento (opcional)
        </label>
        <Input
          value={values.paymentMethod}
          onChange={(e) => setValues({ ...values, paymentMethod: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-expense lg:col-span-6">{error}</p>}

      <div className="flex gap-2 lg:col-span-6">
        <Button type="submit" disabled={submitting}>
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

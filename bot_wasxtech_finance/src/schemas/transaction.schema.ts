import { z } from "zod";

export const transactionTypeSchema = z.enum(["INCOME", "EXPENSE"]);

export const createTransactionSchema = z.object({
  description: z.string().trim().min(1, "Descrição é obrigatória"),
  amount: z.number().positive("Valor deve ser maior que zero"),
  type: transactionTypeSchema,
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  paymentMethod: z.string().trim().optional().nullable(),
  transactionDate: z.coerce.date(),
  originalMessage: z.string().trim().optional().nullable(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export const transactionFiltersSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  categoryId: z.string().optional(),
  type: transactionTypeSchema.optional(),
  search: z.string().trim().optional(),
});

export const chatMessageSchema = z.object({
  message: z.string().trim().min(1, "Mensagem vazia"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type TransactionFiltersInput = z.infer<typeof transactionFiltersSchema>;

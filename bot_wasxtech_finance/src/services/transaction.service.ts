import type { Prisma } from "@prisma/client";
import {
  transactionRepository,
  type TransactionFilters,
} from "@/repositories/transaction.repository";
import { categoryRepository } from "@/repositories/category.repository";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "@/schemas/transaction.schema";
import type { TransactionDTO } from "@/types";

type TransactionWithCategory = Prisma.TransactionGetPayload<{
  include: { category: true };
}>;

function toDTO(transaction: TransactionWithCategory): TransactionDTO {
  return {
    id: transaction.id,
    description: transaction.description,
    amount: Number(transaction.amount),
    type: transaction.type,
    categoryId: transaction.categoryId,
    categoryName: transaction.category.name,
    paymentMethod: transaction.paymentMethod,
    transactionDate: transaction.transactionDate.toISOString(),
    originalMessage: transaction.originalMessage,
  };
}

export const transactionService = {
  async list(filters: TransactionFilters = {}): Promise<TransactionDTO[]> {
    const rows = await transactionRepository.findMany(filters);
    return rows.map(toDTO);
  },

  async getById(id: string): Promise<TransactionDTO | null> {
    const row = await transactionRepository.findById(id);
    return row ? toDTO(row) : null;
  },

  async create(input: CreateTransactionInput): Promise<TransactionDTO> {
    const category = await categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }
    if (category.type !== input.type) {
      throw new Error("Categoria não corresponde ao tipo da movimentação");
    }

    const created = await transactionRepository.create({
      description: input.description,
      amount: input.amount,
      type: input.type,
      categoryId: input.categoryId,
      paymentMethod: input.paymentMethod ?? null,
      transactionDate: input.transactionDate,
      originalMessage: input.originalMessage ?? null,
    });
    return toDTO(created);
  },

  async update(
    id: string,
    input: UpdateTransactionInput,
  ): Promise<TransactionDTO> {
    if (input.categoryId) {
      const category = await categoryRepository.findById(input.categoryId);
      if (!category) throw new Error("Categoria não encontrada");
    }
    const updated = await transactionRepository.update(id, input);
    return toDTO(updated);
  },

  async remove(id: string): Promise<void> {
    await transactionRepository.delete(id);
  },
};

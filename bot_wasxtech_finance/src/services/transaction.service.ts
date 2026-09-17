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
  async list(userId: string, filters: TransactionFilters = {}): Promise<TransactionDTO[]> {
    const rows = await transactionRepository.findMany(userId, filters);
    return rows.map(toDTO);
  },

  async getById(id: string, userId: string): Promise<TransactionDTO | null> {
    const row = await transactionRepository.findById(id, userId);
    return row ? toDTO(row) : null;
  },

  async create(userId: string, input: CreateTransactionInput): Promise<TransactionDTO> {
    const category = await categoryRepository.findById(input.categoryId, userId);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }
    if (category.type !== input.type) {
      throw new Error("Categoria não corresponde ao tipo da movimentação");
    }

    const created = await transactionRepository.create({
      userId,
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
    userId: string,
    input: UpdateTransactionInput,
  ): Promise<TransactionDTO> {
    if (input.categoryId) {
      const category = await categoryRepository.findById(input.categoryId, userId);
      if (!category) throw new Error("Categoria não encontrada");
    }
    const updated = await transactionRepository.update(id, userId, input);
    if (!updated) throw new Error("Movimentação não encontrada");
    return toDTO(updated);
  },

  async remove(id: string, userId: string): Promise<void> {
    const removed = await transactionRepository.delete(id, userId);
    if (!removed) throw new Error("Movimentação não encontrada");
  },
};

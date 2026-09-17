import { NextResponse } from "next/server";
import { transactionService } from "@/services/transaction.service";
import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionFiltersSchema,
} from "@/schemas/transaction.schema";
import type { TransactionType } from "@prisma/client";

function errorResponse(error: unknown, fallbackStatus = 400) {
  const message = error instanceof Error ? error.message : "Erro inesperado";
  return NextResponse.json({ error: message }, { status: fallbackStatus });
}

export const transactionController = {
  async list(request: Request) {
    const { searchParams } = new URL(request.url);
    const parsed = transactionFiltersSchema.safeParse({
      from: searchParams.get("from") ?? undefined,
      to: searchParams.get("to") ?? undefined,
      categoryId: searchParams.get("categoryId") ?? undefined,
      type: (searchParams.get("type") as TransactionType | null) ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    const transactions = await transactionService.list(parsed.data);
    return NextResponse.json({ transactions });
  },

  async create(request: Request) {
    const body = await request.json();
    const parsed = createTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    try {
      const transaction = await transactionService.create(parsed.data);
      return NextResponse.json({ transaction }, { status: 201 });
    } catch (error) {
      return errorResponse(error);
    }
  },

  async update(request: Request, id: string) {
    const body = await request.json();
    const parsed = updateTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    try {
      const transaction = await transactionService.update(id, parsed.data);
      return NextResponse.json({ transaction });
    } catch (error) {
      return errorResponse(error);
    }
  },

  async remove(id: string) {
    try {
      await transactionService.remove(id);
      return NextResponse.json({ ok: true });
    } catch (error) {
      return errorResponse(error);
    }
  },
};

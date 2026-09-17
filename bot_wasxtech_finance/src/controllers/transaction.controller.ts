import { NextResponse } from "next/server";
import { transactionService } from "@/services/transaction.service";
import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionFiltersSchema,
} from "@/schemas/transaction.schema";
import { getUserId } from "@/lib/session";
import type { TransactionType } from "@prisma/client";

function errorResponse(error: unknown, fallbackStatus = 400) {
  const message = error instanceof Error ? error.message : "Erro inesperado";
  return NextResponse.json({ error: message }, { status: fallbackStatus });
}

function unauthorized() {
  return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
}

export const transactionController = {
  async list(request: Request) {
    const userId = await getUserId(request);
    if (!userId) return unauthorized();

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
    const transactions = await transactionService.list(userId, parsed.data);
    return NextResponse.json({ transactions });
  },

  async create(request: Request) {
    const userId = await getUserId(request);
    if (!userId) return unauthorized();

    const body = await request.json();
    const parsed = createTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    try {
      const transaction = await transactionService.create(userId, parsed.data);
      return NextResponse.json({ transaction }, { status: 201 });
    } catch (error) {
      return errorResponse(error);
    }
  },

  async update(request: Request, id: string) {
    const userId = await getUserId(request);
    if (!userId) return unauthorized();

    const body = await request.json();
    const parsed = updateTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    try {
      const transaction = await transactionService.update(id, userId, parsed.data);
      return NextResponse.json({ transaction });
    } catch (error) {
      return errorResponse(error, 404);
    }
  },

  async remove(request: Request, id: string) {
    const userId = await getUserId(request);
    if (!userId) return unauthorized();

    try {
      await transactionService.remove(id, userId);
      return NextResponse.json({ ok: true });
    } catch (error) {
      return errorResponse(error, 404);
    }
  },
};

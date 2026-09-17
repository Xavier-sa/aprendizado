import { prisma } from "@/lib/prisma";
import type { Prisma, TransactionType } from "@prisma/client";

/** Categorias globais (userId null) + as próprias do usuário — nunca as de outro. */
function visibleTo(userId: string): Prisma.CategoryWhereInput {
  return { OR: [{ userId: null }, { userId }] };
}

export const categoryRepository = {
  findAll(userId: string) {
    return prisma.category.findMany({
      where: visibleTo(userId),
      orderBy: { name: "asc" },
    });
  },

  findByType(type: TransactionType, userId: string) {
    return prisma.category.findMany({
      where: { type, ...visibleTo(userId) },
      orderBy: { name: "asc" },
    });
  },

  findById(id: string, userId: string) {
    return prisma.category.findFirst({ where: { id, ...visibleTo(userId) } });
  },

  findByName(name: string, type: TransactionType, userId: string) {
    return prisma.category.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, type, ...visibleTo(userId) },
    });
  },

  /** Categorias criadas pelo chat pertencem a quem as criou — nunca globais. */
  create({ name, type, userId }: { name: string; type: TransactionType; userId: string }) {
    return prisma.category.create({ data: { name, type, userId } });
  },
};

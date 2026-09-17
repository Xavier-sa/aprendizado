import { prisma } from "@/lib/prisma";
import type { TransactionType } from "@prisma/client";

export const categoryRepository = {
  findAll() {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
  },

  findByType(type: TransactionType) {
    return prisma.category.findMany({
      where: { type },
      orderBy: { name: "asc" },
    });
  },

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },

  findByName(name: string, type: TransactionType) {
    return prisma.category.findFirst({
      where: { name: { equals: name, mode: "insensitive" }, type },
    });
  },
};

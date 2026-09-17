import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const EXPENSE_CATEGORIES = [
  "Mercado",
  "Alimentação",
  "Transporte",
  "Combustível",
  "Moradia",
  "Energia",
  "Água",
  "Internet",
  "Saúde",
  "Educação",
  "Lazer",
  "Assinaturas",
  "Investimentos",
  "Serviços",
  "Outros",
];

const INCOME_CATEGORIES = [
  "Salário",
  "Dividendos",
  "Rendimentos",
  "Venda",
  "Reembolso",
  "Outros",
];

/**
 * Seed apenas cria dados estruturais (categorias padrão). Nunca cria
 * Transaction — o histórico financeiro só existe a partir do uso real
 * da aplicação (ver ADR-007 em docs/decisions.md).
 */
/**
 * Sem `upsert`: o Prisma não aceita `null` dentro de uma chave composta
 * (`name_type_userId`), mesmo `userId` sendo uma coluna anulável — é
 * assim que Prisma modela unicidade composta com campo opcional. Por
 * isso o find-then-create explícito abaixo, em vez de upsert.
 */
async function ensureGlobalCategory(name: string, type: "EXPENSE" | "INCOME") {
  const existing = await prisma.category.findFirst({
    where: { name, type, userId: null },
  });
  if (existing) return false;
  await prisma.category.create({ data: { name, type } });
  return true;
}

async function seedCategories() {
  let created = 0;

  for (const name of EXPENSE_CATEGORIES) {
    if (await ensureGlobalCategory(name, "EXPENSE")) created += 1;
  }

  for (const name of INCOME_CATEGORIES) {
    if (await ensureGlobalCategory(name, "INCOME")) created += 1;
  }

  return created;
}

async function main() {
  console.log("Criando/atualizando categorias padrão...");
  await seedCategories();

  const categoryCount = await prisma.category.count();
  const transactionCount = await prisma.transaction.count();

  console.log(`Seed concluído: ${categoryCount} categorias disponíveis.`);
  console.log(
    `Transações existentes: ${transactionCount} (o seed nunca cria ou apaga transações).`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

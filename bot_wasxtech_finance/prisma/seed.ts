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
async function seedCategories() {
  let created = 0;

  for (const name of EXPENSE_CATEGORIES) {
    const result = await prisma.category.upsert({
      where: { name_type: { name, type: "EXPENSE" } },
      update: {},
      create: { name, type: "EXPENSE" },
    });
    if (result) created += 1;
  }

  for (const name of INCOME_CATEGORIES) {
    await prisma.category.upsert({
      where: { name_type: { name, type: "INCOME" } },
      update: {},
      create: { name, type: "INCOME" },
    });
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

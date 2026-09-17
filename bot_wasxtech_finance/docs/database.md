# Banco de dados

PostgreSQL hospedado no [Neon](https://neon.tech), acessado via Prisma ORM
com o driver adapter `@prisma/adapter-pg` (ver [decisions.md](./decisions.md#adr-005--driver-adapter-do-prisma-prismaadapter-pg)).

## Modelos

### Category

| Campo     | Tipo             | Observação                          |
|-----------|------------------|--------------------------------------|
| id        | String (cuid)    | chave primária                       |
| name      | String           | único em conjunto com `type`         |
| type      | TransactionType  | `INCOME` ou `EXPENSE`                |
| createdAt | DateTime         |                                       |
| updatedAt | DateTime         |                                       |

### Transaction

| Campo           | Tipo               | Observação                                   |
|-----------------|--------------------|-----------------------------------------------|
| id              | String (cuid)      | chave primária                                |
| description     | String             |                                                |
| amount          | Decimal(12,2)      | **nunca Float** — ver ADR-003                 |
| type            | TransactionType    | `INCOME` ou `EXPENSE`                         |
| categoryId      | String              | FK para `Category`                            |
| paymentMethod   | String?            | opcional                                      |
| transactionDate | DateTime           | data do fato (não é `createdAt`)              |
| originalMessage | String?            | mensagem original do chat, quando aplicável   |
| createdAt       | DateTime           |                                                |
| updatedAt       | DateTime           |                                                |

Índices em `transactionDate`, `categoryId` e `type` para acelerar os
filtros e agregações usados no dashboard e na página de movimentações.

## Migrations

Geradas com `npx prisma migrate dev` e versionadas em
`prisma/migrations/`. Para aplicar em um banco novo:

```bash
npm run db:migrate
```

## Seed

`prisma/seed.ts` cria as categorias padrão (ver README) e cerca de 3
meses de transações fictícias, o suficiente para os gráficos do dashboard
terem dado assim que o projeto sobe. Nenhum dado real é usado.

```bash
npm run db:seed
```

## Configuração de conexão

A URL de conexão fica **apenas** em `.env` (nunca versionado — ver
`.gitignore`). `prisma.config.ts` lê `DATABASE_URL` para as migrations, e
`src/lib/prisma.ts` monta o `PrismaClient` com o adapter `@prisma/adapter-pg`
usando a mesma variável em tempo de execução.

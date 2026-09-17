# Banco de dados

PostgreSQL hospedado no [Neon](https://neon.tech), acessado via Prisma ORM
com o driver adapter `@prisma/adapter-pg` (ver [decisions.md](./decisions.md#adr-005--driver-adapter-do-prisma-prismaadapter-pg)).

## Modelos

### User, Session, Account, Verification

Tabelas exigidas pelo [Better Auth](https://www.better-auth.com) (ver
[authentication.md](./authentication.md) e ADR-008 em
[decisions.md](./decisions.md#adr-008--autenticação-com-better-auth-e-propriedade-dos-dados)).
Nomes e campos seguem o schema canônico da lib — `Account` guarda tanto
contas de login social (futuro) quanto o hash de senha do login por
e-mail/senha (campo `password`), já que o Better Auth não guarda senha
diretamente em `User`.

### Category

| Campo     | Tipo             | Observação                                          |
|-----------|------------------|-------------------------------------------------------|
| id        | String (cuid)    | chave primária                                        |
| name      | String           |                                                        |
| type      | TransactionType  | `INCOME` ou `EXPENSE`                                 |
| userId    | String?          | `null` = categoria padrão do sistema; ver ADR-008     |
| createdAt | DateTime         |                                                        |
| updatedAt | DateTime         |                                                        |

Único em `(name, type, userId)`. Categorias com `userId` nulo são as
padrão do sistema (criadas pelo seed, visíveis a todos); categorias com
`userId` preenchido foram criadas por um usuário pelo chat e são visíveis
só para ele.

### Transaction

| Campo           | Tipo               | Observação                                   |
|-----------------|--------------------|-----------------------------------------------|
| id              | String (cuid)      | chave primária                                |
| userId          | String              | FK para `User` — dono da movimentação         |
| description     | String             |                                                |
| amount          | Decimal(12,2)      | **nunca Float** — ver ADR-003                 |
| type            | TransactionType    | `INCOME` ou `EXPENSE`                         |
| categoryId      | String              | FK para `Category`                            |
| paymentMethod   | String?            | opcional                                      |
| transactionDate | DateTime           | data do fato (não é `createdAt`)              |
| originalMessage | String?            | mensagem original do chat, quando aplicável   |
| createdAt       | DateTime           |                                                |
| updatedAt       | DateTime           |                                                |

Índices em `transactionDate`, `categoryId`, `type` e `userId` para
acelerar os filtros e agregações usados no dashboard e na página de
movimentações. Toda consulta a `Transaction` é obrigatoriamente filtrada
por `userId` — ver ADR-008.

## Migrations

Geradas com `npx prisma migrate dev` e versionadas em
`prisma/migrations/`. Para aplicar em um banco novo:

```bash
npm run db:migrate
```

A migration `add_auth_and_user_ownership` (que cria `User`/`Session`/
`Account`/`Verification` e adiciona `userId`) foi gerada de forma não
interativa com `prisma migrate diff` + `prisma migrate deploy`, porque
`prisma migrate dev` exige confirmação interativa (não suportada neste
ambiente) mesmo só para avisos. Já foi **aplicada** no banco do Neon —
`prisma migrate status` confirma "Database schema is up to date". Antes
de aplicá-la, as 2 únicas `Transaction` existentes (dados de teste
manuais, confirmados pelo responsável do projeto) foram removidas por
`id` explícito — nenhuma `Category` foi tocada.

## Seed

`prisma/seed.ts` cria apenas as categorias padrão do sistema (`userId`
nulo) — nunca cria `Transaction` (ver ADR-007).

```bash
npm run db:seed
```

## Configuração de conexão

A URL de conexão fica **apenas** em `.env` (nunca versionado — ver
`.gitignore`). `prisma.config.ts` lê `DATABASE_URL` para as migrations, e
`src/lib/prisma.ts` monta o `PrismaClient` com o adapter `@prisma/adapter-pg`
usando a mesma variável em tempo de execução.

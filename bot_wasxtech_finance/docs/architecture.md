# Arquitetura

Visão geral de como o código está organizado. Ver também
[uml.md](./uml.md) para os diagramas e [decisions.md](./decisions.md)
para o porquê de cada escolha.

## Camadas

O projeto segue uma separação inspirada em MVC, adaptada ao Next.js
(App Router):

- **View** — `src/app/*` (páginas) e `src/components/*` (UI). Páginas de
  dashboard e movimentações são Server Components que buscam dados
  diretamente dos services; o chat e o CRUD de movimentações são Client
  Components que conversam com a API via `fetch`.
- **Controller** — `src/controllers/*`. Recebem a `Request` do Next.js,
  validam entrada com Zod (`src/schemas/*`), coordenam services e
  repositories, e devolvem `NextResponse`. As rotas em `src/app/api/*`
  são wrappers finos que só chamam o controller correspondente.
- **Service** — `src/services/*`. Regras de negócio puras:
  - `parser.service.ts`: interpreta mensagens em linguagem natural
    (tipo, valor, categoria, data), sem tocar no banco.
  - `financial.service.ts`: agrega dados para o dashboard e os gráficos.
  - `query.service.ts`: responde perguntas financeiras em linguagem
    natural, sempre calculando a partir do banco.
  - `transaction.service.ts`: regras de criação/edição de movimentações
    (ex.: validar que a categoria bate com o tipo).
- **Repository** — `src/repositories/*`. Único lugar que fala Prisma
  diretamente (`transaction.repository.ts`, `category.repository.ts`).
- **Model** — `prisma/schema.prisma` define `Category` e `Transaction`.

## Por que o chat não guarda estado no servidor

O fluxo de confirmação/clarificação do chat (`chat.controller.ts`) é
stateless: a cada resposta, o servidor devolve um `draft` (ou uma lista de
candidatos, no caso de exclusão ambígua) que o cliente reenvia na próxima
mensagem como `context`. Isso evita criar uma tabela só para guardar
conversas em andamento — o "estado da conversa" vive na própria troca de
mensagens, o que é suficiente para o escopo atual (uma sessão de chat por
vez, sem histórico persistido de conversas).

## Banco de dados

Ver [database.md](./database.md).

## O que não existe (ainda)

Autenticação, múltiplos usuários, filas/jobs em background, cache,
qualquer chamada a LLM. Ver [roadmap.md](./roadmap.md).

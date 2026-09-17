# FinanceBot

Um jeito simples de registrar gastos do dia a dia conversando, em vez de
preencher formulários — com dashboard, gráficos e consultas em linguagem
natural.

## Sobre o projeto

Este projeto nasceu de uma necessidade simples: registrar melhor meus
próprios gastos enquanto pratico desenvolvimento de software.

A primeira versão não pretende substituir aplicativos financeiros
consolidados. O objetivo é aprender, experimentar e construir uma solução
simples que eu realmente possa utilizar no cotidiano.

O projeto está em evolução e novas funcionalidades serão adicionadas
conforme surgirem necessidades reais e novos aprendizados.

## A dor

Controlar pequenos gastos do cotidiano normalmente exige abrir uma
planilha, aplicativo ou formulário, escolher categoria, preencher data,
descrição e valor. Essa fricção faz com que pequenos gastos deixem de ser
registrados.

Exemplos do tipo de frase que motivou o projeto:

- "Fiz mercado, deu 187,43."
- "Abasteci 150 reais hoje."
- "Paguei 95 de energia."
- "Recebi 198,30 de dividendos."

## Por que construí este projeto

Para reduzir essa fricção: em vez de preencher vários campos, eu escrevo o
que aconteceu. O sistema interpreta a frase, estrutura os dados, pede
confirmação quando necessário e registra a movimentação. Depois, transforma
o histórico em informação — totais, categorias, saldo, comparações e
gráficos.

## O que ele faz

- Interpreta mensagens em linguagem natural (português) e extrai tipo,
  valor, categoria e data de uma movimentação, usando um **parser
  determinístico** — sem LLM.
- Pede confirmação antes de registrar, e pergunta o que faltar (nunca
  inventa categoria ou valor).
- Responde perguntas financeiras direto no chat ("Qual meu saldo?",
  "Quanto gastei com mercado?", "Compare este mês com o anterior"),
  sempre calculando a partir do banco.
- Permite corrigir e apagar lançamentos pelo chat ("Na verdade foram
  175", "Apague meu último lançamento"), com desambiguação quando há mais
  de um candidato.
- Dashboard com saldo, receitas/despesas do mês, resultado mensal,
  contagem de movimentações e 4 gráficos (receitas x despesas por mês,
  despesas por categoria, evolução do saldo, evolução mensal dos gastos).
- CRUD completo de movimentações pela tela `/transactions`, com filtros
  por período, categoria, tipo e busca por descrição.

## O que ele ainda NÃO faz

Ver [docs/roadmap.md](docs/roadmap.md) para a lista completa. Resumindo:
não tem autenticação/múltiplos usuários, não lida com contas recorrentes,
parcelamento, orçamento mensal, metas, investimentos, importação/exportação
de extratos, e não usa nenhum LLM — o parser é 100% baseado em regras.

## Tecnologias

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [PostgreSQL](https://www.postgresql.org) via [Neon](https://neon.tech)
- [Prisma ORM](https://www.prisma.io) (com driver adapter `@prisma/adapter-pg`)
- [Zod](https://zod.dev) para validação
- [Recharts](https://recharts.org) para os gráficos
- [date-fns](https://date-fns.org) para datas
- [Vitest](https://vitest.dev) para os testes

## Arquitetura

Separação inspirada em MVC, adaptada ao Next.js: `controllers` (Route
Handlers), `services` (regras de negócio, parser, cálculos), `repositories`
(acesso ao Prisma) e `components`/`app` para a interface. Detalhes em
[docs/architecture.md](docs/architecture.md) e diagramas (Mermaid) em
[docs/uml.md](docs/uml.md).

## Modelagem

Dois modelos: `Category` e `Transaction` (1:N), com `amount` como
`Decimal(12,2)` — nunca `Float`, para evitar erro de arredondamento em
valores monetários. Detalhes em [docs/database.md](docs/database.md).

## Como funciona

1. Você escreve algo como "Gastei 187,43 no mercado hoje" no chat.
2. O parser identifica tipo (despesa), valor (R$ 187,43), categoria
   (Mercado, por palavra-chave) e data (hoje).
3. O sistema mostra uma prévia e pede confirmação.
4. Ao confirmar, a movimentação é salva no Postgres (Neon) via Prisma.
5. Dashboard e histórico refletem o novo lançamento imediatamente.

## Primeiro uso

O FinanceBot não inclui movimentações financeiras fictícias por padrão.

Após configurar o banco, o dashboard começa zerado — saldo, receitas e
despesas em R$ 0,00, nenhuma movimentação. Isso permite que o histórico
financeiro seja construído naturalmente a partir das movimentações
registradas pelo próprio usuário, em vez de nascer misturado a dados de
demonstração.

Exemplo:

> "Gastei 50 reais no mercado hoje."

Após a confirmação, a movimentação é persistida no PostgreSQL/Neon e
automaticamente refletida no histórico, nos indicadores e nos gráficos do
dashboard.

## Executando localmente

Pré-requisitos: Node.js 20+ e um banco PostgreSQL no Neon (ver seção
abaixo).

```bash
npm install
cp .env.example .env   # preencha DATABASE_URL com a sua connection string
npm run db:migrate     # aplica as migrations no seu banco
npm run db:seed        # cria/atualiza as categorias padrão (não cria nenhuma transação)
npm run dev             # http://localhost:3000
```

Scripts úteis:

```bash
npm run test        # testes (Vitest) — parser e regras financeiras
npm run lint         # ESLint
npm run typecheck   # tsc --noEmit
npm run build        # build de produção
npm run db:studio   # Prisma Studio, para inspecionar o banco
```

## Integração Contínua

O projeto utiliza GitHub Actions para validar automaticamente, a cada
`push` ou `pull request` que altere o FinanceBot:

- testes;
- lint;
- TypeScript;
- Prisma (geração do client);
- build.

Detalhes e motivação de cada etapa em [docs/ci.md](docs/ci.md).

## Configurando Neon

1. Crie um projeto gratuito em [neon.tech](https://neon.tech).
2. Copie a connection string (formato
   `postgresql://usuario:senha@host/banco?sslmode=require`).
3. Cole em `.env` como `DATABASE_URL` (esse arquivo nunca é versionado).

## Prisma

- `prisma/schema.prisma` — apenas a estrutura dos dados (sem URL de
  conexão — isso mudou a partir do Prisma ORM v7).
- `prisma.config.ts` — lê `DATABASE_URL` do `.env` para rodar migrations.
- `src/lib/prisma.ts` — instancia o `PrismaClient` com o driver adapter
  `@prisma/adapter-pg` em tempo de execução.
- `prisma/seed.ts` — cria/atualiza apenas as categorias padrão. Nunca cria,
  apaga ou altera `Transaction` (ver ADR-007 em
  [docs/decisions.md](docs/decisions.md)).

## Segurança

- `.env` nunca é commitado (`.gitignore` cobre `.env*`, `*.sql`, `*.dump`).
- `.env.example` contém apenas um placeholder de `DATABASE_URL`.
- Nenhuma credencial real aparece neste README ou em logs da aplicação.
- Se uma credencial real for exposta acidentalmente em algum momento
  (commit, print, etc.), o certo é **rotacionar a senha no Neon**, nunca
  reutilizá-la.

## Estrutura de diretórios

```
src/
  app/            páginas (dashboard, chat, transactions) e rotas de API
  components/     ui, layout, dashboard, chat, transactions, charts
  controllers/    validação (Zod) + coordenação entre services/repositories
  services/       parser, regras financeiras, consultas em linguagem natural
  repositories/   acesso ao Prisma
  lib/            prisma client, formatação de moeda e datas
  schemas/        schemas Zod
  types/          tipos compartilhados
  utils/          casamento de categoria por palavra-chave
prisma/
  schema.prisma
  seed.ts
docs/
  architecture.md, database.md, uml.md, decisions.md, roadmap.md
```

## Exemplos de uso

No chat:

- `Gastei 187,43 no mercado hoje` → prévia de despesa em Mercado
- `Recebi 198,30 de dividendos` → prévia de receita em Dividendos
- `Gastei 100` → pergunta a categoria antes de registrar
- `Qual meu saldo?` → responde com o saldo real, vindo do banco
- `Quanto gastei com mercado?` → soma real de despesas em Mercado
- `Na verdade foram 175` → corrige o valor do último lançamento
- `Apague meu último lançamento` → apaga o último lançamento

## Screenshots

Dashboard no estado inicial (zerado, antes do primeiro lançamento):

![Dashboard do FinanceBot zerado](docs/screenshots/dashboard-empty.png)

Chat (confirmação de lançamento):

![Chat do FinanceBot pedindo confirmação](docs/screenshots/chat.png)

## Roadmap

Ver [docs/roadmap.md](docs/roadmap.md).

## Aprendizados

- Modelar dinheiro com `Decimal` em vez de `Float` evita bugs sutis de
  arredondamento que só apareceriam depois de muitos lançamentos.
- Um parser baseado em regras, bem testado, resolve um conjunto pequeno e
  bem definido de frases sem precisar de LLM — e é muito mais fácil de
  depurar quando erra.
- Manter o chat sem estado no servidor (o "rascunho" da conversa viaja
  entre cliente e servidor a cada mensagem) evitou criar uma tabela só
  para sessões de chat, sem perder a capacidade de pedir confirmação e
  clarificação em várias etapas.
- O Prisma ORM v7 mudou bastante a forma de configurar a conexão com o
  banco (driver adapters obrigatórios, `prisma.config.ts`) — vale
  conferir a versão instalada antes de seguir tutoriais antigos.

## Limitações atuais

- O parser reconhece um vocabulário fixo de palavras-chave; frases muito
  diferentes das listadas em [docs/decisions.md](docs/decisions.md) podem
  não ser entendidas.
- Comandos de edição pelo chat ("mude para...", "na verdade foram...")
  atuam sempre sobre o **último lançamento**, não sobre um lançamento
  específico mencionado no meio de uma conversa mais longa.
- Sem autenticação: qualquer pessoa com acesso à aplicação vê e edita
  todos os dados.

## Licença

Uso pessoal e educacional.

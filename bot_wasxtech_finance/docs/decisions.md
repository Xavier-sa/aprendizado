# Decisões de arquitetura (ADRs)

Registro simples das decisões técnicas do projeto e o motivo por trás de
cada uma. Não é um processo formal de ADR — só um jeito de deixar claro
"por que fizemos assim" para quem ler o código depois (inclusive eu mesmo).

## ADR-001 — PostgreSQL/Neon em vez de SQLite

**Decisão:** usar PostgreSQL hospedado no Neon como banco de dados.

**Motivo:** evitar uma migração posterior de SQLite para um banco
"de verdade" e praticar PostgreSQL desde o início, já que é o banco mais
comum em produção. O Neon oferece um plano gratuito que atende bem a um
projeto pessoal.

## ADR-002 — Parser determinístico antes de LLM

**Decisão:** a primeira versão do chatbot interpreta mensagens com um
parser baseado em regras (palavras-chave, regex de valor/data), sem
nenhuma chamada a LLM (OpenAI, Gemini, Claude, etc.).

**Motivo:** simplicidade, custo zero, previsibilidade e privacidade — os
dados financeiros nunca saem da aplicação. Um parser determinístico
também é mais fácil de testar (ver `src/services/parser.service.test.ts`)
e de explicar. Se um LLM for adicionado no futuro, isso será documentado
explicitamente (ver seção 31 do escopo do projeto).

## ADR-003 — Decimal para dinheiro

**Decisão:** o campo `amount` em `Transaction` usa `Decimal @db.Decimal(12, 2)`
no Prisma, nunca `Float`.

**Motivo:** `Float` sofre de erros de arredondamento de ponto flutuante
(ex.: `0.1 + 0.2 !== 0.3`), o que é inaceitável para valores financeiros.
`Decimal` garante precisão exata para valores monetários.

## ADR-004 — Repository / Service / Controller

**Decisão:** separar o código em camadas: `repositories/` (acesso direto
ao Prisma), `services/` (regras de negócio, parser, cálculos financeiros)
e `controllers/` (validação com Zod e coordenação, chamados pelas Route
Handlers do Next.js).

**Motivo:** manter as regras financeiras e a interpretação de mensagens
independentes de como os dados são persistidos, e manter as rotas HTTP
como uma camada fina. Isso facilita testar `parser.service.ts` e
`financial.service.ts` isoladamente, sem precisar de banco de dados.

## ADR-005 — Driver adapter do Prisma (`@prisma/adapter-pg`)

**Decisão:** usar `@prisma/adapter-pg` (via `pg`) e um `prisma.config.ts`
próprio para configurar a conexão com o banco.

**Motivo:** a partir do Prisma ORM v7, a URL de conexão não é mais aceita
diretamente no `datasource` do `schema.prisma`, e o `PrismaClient` passou a
exigir um driver adapter explícito. `@prisma/adapter-pg` é a opção mais
simples para um Postgres "tradicional" (o Neon aceita conexões via `pg`
normalmente), evitando a complexidade adicional de um adapter
específico para edge/serverless (`@prisma/adapter-neon`) que este projeto
não precisa.

## ADR-006 — Consultas em linguagem natural com padrões fechados

**Decisão:** `query.service.ts` reconhece um conjunto fixo de perguntas
("quanto gastei...", "qual meu saldo", "compare este mês...") por meio de
regex, calculando as respostas sempre a partir do banco — nunca inventa
valores.

**Motivo:** evitar a complexidade de um NLU genérico para um conjunto
pequeno e bem definido de perguntas. Mantém o comportamento previsível e
fácil de estender com novos padrões conforme a necessidade real aparecer.

## ADR-007 — Banco inicia sem movimentações financeiras

**Contexto:** seeds financeiros artificiais facilitariam a demonstração
dos gráficos e do dashboard, mas não representam o fluxo real de
utilização da aplicação — e um repositório público não deveria sugerir
que "gastos de exemplo" são parte do produto.

**Decisão:** o sistema inicia sem nenhuma `Transaction`. Apenas dados
estruturais, como as categorias padrão, são criados automaticamente pelo
seed (`prisma/seed.ts`). Nenhum script do projeto cria, apaga ou
sobrescreve `Transaction` em lote — o histórico financeiro só existe a
partir do uso real da aplicação (chat ou tela de movimentações).

**Motivo:** permitir que o histórico financeiro seja construído
exclusivamente através da utilização real do chatbot e das telas de
movimentação, tornando a primeira experiência do usuário (dashboard
zerado → primeiro lançamento → dashboard refletindo o dado real) parte
da demonstração do produto, não um obstáculo a contornar com dados falsos.

**Consequência:** dashboard e gráficos precisam de estados vazios
adequados (implementado em `components/charts/EmptyChartState.tsx` e nas
mensagens equivalentes em `components/dashboard/CategoryBreakdown.tsx`) —
sem isso, um usuário novo veria gráficos em branco sem explicação.

## ADR-008 — Autenticação com Better Auth e propriedade dos dados

**Contexto:** o FinanceBot foi construído para uso pessoal — nenhuma
tabela tinha noção de "dono". Para publicar como projeto de portfólio
acessível publicamente, isso deixa de ser aceitável: sem isolamento,
qualquer visitante veria/editaria/apagaria as movimentações de qualquer
outra pessoa.

**Decisão (autenticação):** usar [Better Auth](https://www.better-auth.com)
com o adapter Prisma nativo (`better-auth/adapters/prisma`), e-mail/senha
habilitado.

**Motivo:** mantém 100% dos dados de usuário no mesmo Postgres/Neon do
projeto (alinhado à postura de privacidade do ADR-002 — nada sai da
aplicação), tem tipagem TypeScript de ponta a ponta, e permite adicionar
login social (Google, etc.) depois só configurando um `socialProviders`,
sem mudar schema. Alternativas consideradas: Auth.js/NextAuth v5 (muito
usado, mas a v5 nunca teve uma versão estável definitiva) e Clerk (ótima
DX, mas é um serviço externo — parte dos dados de usuário sairia do nosso
banco).

**Decisão (modelagem):** `Transaction.userId` é obrigatório — toda
movimentação pertence a exatamente um usuário. `Category` é híbrida:
`userId` nulo = categoria padrão do sistema (visível a todos, criada pelo
seed), `userId` preenchido = categoria criada por um usuário específico
pelo chat (visível só para quem criou). Isso só formaliza um
comportamento que já existia informalmente: o seed sempre criou uma lista
padrão, e o chat sempre permitiu criar categorias novas em tempo real —
só faltava isolar a segunda parte.

**Limitação técnica conhecida:** o Postgres trata cada `NULL` como
distinto dentro de uma constraint única, então `@@unique([name, type,
userId])` não impede, por si só, duas categorias globais duplicadas com o
mesmo nome (só impede duplicidade dentro do conjunto de categorias de um
mesmo usuário). Como a única rotina que cria categorias globais é o seed
(controlado), esse é um risco teórico, não uma falha de isolamento entre
usuários — o isolamento em si (usuário A nunca ver/criar em cima dos
dados de B) não depende dessa constraint. Registrado aqui para não ser
esquecido caso um índice único parcial (`WHERE "userId" IS NULL`) seja
adicionado depois.

**Decisão (isolamento no backend):** toda consulta/gravação de
`Transaction` e `Category` passa `userId` explicitamente — não existe
mais nenhum `findMany`/`update`/`delete` "global" nessas tabelas.
`update`/`delete` de `Transaction` usam `updateMany`/`deleteMany` com
`where: { id, userId }` (nunca só `{ id }`), então tentar alterar/apagar
uma movimentação de outra pessoa simplesmente não afeta nenhuma linha —
o controller então responde com o mesmo erro genérico de "não encontrada"
usado para IDs inexistentes, para não revelar que o registro existe e
pertence a outra pessoa.

**Decisão (dados de teste existentes):** ao desenhar essa mudança, o
banco do Neon tinha 2 `Transaction` criadas manualmente durante o
desenvolvimento, sem nenhum usuário ainda existente. Confirmado com o
responsável pelo projeto que eram dados de teste — foram removidas por
`id` explícito (não por um `deleteMany({})` genérico) antes da migration
que torna `Transaction.userId` obrigatório. As 21 categorias padrão não
foram tocadas. Migration aplicada e confirmada (`prisma migrate status`).

**Validação:** além dos testes automatizados de isolamento
(`transaction.repository.test.ts`, `category.repository.test.ts`), foi
feito um smoke test manual com dois usuários reais (e-mails de teste,
removidos depois) provando isolamento de ponta a ponta — incluindo B
tentando editar/excluir uma `Transaction` de A pela API diretamente, que
retornou `404` sem revelar que o registro existia.

## ADR-009 — Desativar a geração automática de AGENTS.md/CLAUDE.md

**Contexto:** o Next.js 16 passou a gerar automaticamente `AGENTS.md` e
`CLAUDE.md` na raiz do projeto sempre que `next dev` detecta um agente de
código de IA, para que o agente leia documentação da versão instalada em
vez de depender do próprio conhecimento (possivelmente desatualizado)
sobre a API do framework.

**Decisão:** desativado com `agentRules: false` em `next.config.ts` (opção
estável e documentada nesta versão do Next.js — não experimental), e os
dois arquivos gerados foram removidos.

**Motivo:** são arquivos gerados, não fazem parte da aplicação, e
poluiriam o repositório sendo recriados a cada `next dev`.

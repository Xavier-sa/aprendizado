# Integração Contínua

## CI/CD do FinanceBot em produção

- **CI:** `.github/workflows/financebot-ci.yml` valida pushes e PRs com
  alterações em `bot_wasxtech_finance/**` ou no próprio workflow. Mantém
  Node 22, `npm ci`, Prisma generate, testes, lint, typecheck e build.
  As variáveis de banco e autenticação são fictícias, sem acesso ao Neon.
- **CD:** a integração GitHub nativa do projeto Vercel `financebot` está
  conectada a `Xavier-sa/aprendizado`, com Production Branch `main`,
  Root Directory `bot_wasxtech_finance` e Node 22.x. Um merge relevante
  na `main` inicia build e publicação em https://finance.wasxtech.com.br.
  Não há Action de deployment, token Vercel nem secrets reais no CI.
- **Filtro de deploy:** o Ignored Build Step foi configurado nas settings
  da Vercel como `git diff HEAD^ HEAD --quiet -- . ../.github/workflows/financebot-ci.yml`.
  Ele roda dentro do Root Directory: exit 0 cancela o build quando os
  caminhos não mudaram; exit 1 permite o build. Exit de erro também
  permite build, evitando ignorar uma alteração sem comparação válida.
  Esse mecanismo compara o commit com seu primeiro pai; não compara
  todo o histórico desde o último deployment. Cancelamentos ainda
  podem aparecer no painel e contam nos limites de deployment/build;
  não publicam uma nova versão do FinanceBot. O skip automático de
  projetos não se aplica: este repositório de estudos não usa workspaces.

### Quality gate de publicação e regra de merge

O ruleset `main` existente exige Pull Request e protege contra exclusão
e force push, mas não exige `Quality Checks`. Sem um gate adicional,
a integração Vercel inicia e promove builds independentemente do CI.
Para PRs do FinanceBot, aguarde `Quality Checks` verde antes de fazer merge.

A solução preferida é impedir merges sem CI verde. Entretanto, exigir
esse workflow globalmente no ruleset da `main` deixa PRs de outros projetos
bloqueados: o filtro `paths` não roda nesses PRs, e o check obrigatório fica
pendente. Não foi alterado o ruleset global nem removido o filtro por paths.

Foi criado e confirmado via API oficial um **Deployment Check nativo**,
restrito a Production do projeto FinanceBot: `FinanceBot CI`, provider
GitHub, external check `Quality Checks`, `requires: none`,
`blocks: deployment-alias`, timeout 3600 segundos. A Vercel pode construir
em paralelo, mas só libera os domínios de produção após o CI verde do
mesmo commit. Check vermelho, ausente ou vencido não libera a publicação.
Isso protege a publicação; não impede o merge no GitHub. Não exige polling
próprio, Action extra ou secrets. O primeiro ciclo completo desse gate
ainda deve ser observado no próximo merge real; nenhum deployment manual
foi iniciado para testá-lo.

Configuração visível em Vercel → financebot → Settings → Deployment Checks.
Não há etapa manual pendente para esse gate de publicação. Se a intenção
for bloquear também o merge automaticamente, será necessário decidir uma
política para o monorepo: exigir o check filtrado em toda `main` bloquearia
PRs sem mudanças no FinanceBot. Essa alteração global não foi aplicada.

Referências: [Vercel monorepos](https://vercel.com/docs/monorepos),
[Ignored Build Step](https://vercel.com/kb/guide/how-do-i-use-the-ignored-build-step-field-on-vercel),
[Deployment Checks](https://vercel.com/docs/deployment-checks) e
[GitHub: workflows filtrados podem bloquear checks obrigatórios](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).

### Ícones

O ícone padrão foi substituído por barras crescentes, seta e folha, nas
cores da aplicação. O App Router registra automaticamente `src/app/icon.svg`
(vetorial), `favicon.ico` (16/32/48), `apple-icon.png` (180), `icon1.png`
(192) e `icon2.png` (512). Todas as variantes vêm do mesmo SVG local;
nenhuma imagem externa ou declaração manual duplicada no layout.
Para regenerar: `node scripts/generate-icons.mjs`, usando `sharp` já
instalado pelo Next.js, sem adicionar dependência.

## O que é CI?

CI (Continuous Integration / Integração Contínua) é a prática de rodar
automaticamente, a cada mudança de código, um conjunto de verificações que
antes só faziam sentido rodar manualmente: testes, lint, checagem de tipos e
build. Em vez de confiar em "rodei aqui e funcionou", uma máquina neutra
(neste caso, um runner do GitHub Actions) roda tudo de novo, do zero, sempre
da mesma forma.

## Por que adicionei CI ao FinanceBot?

Antes desta mudança, `npm test`, `npm run lint`, `npm run typecheck` e
`npm run build` eram comandos que eu rodava manualmente, quando lembrava.
Isso tem dois problemas: é fácil esquecer, e o resultado depende do estado
da minha máquina local (versão do Node, dependências desatualizadas,
arquivos gerados obsoletos etc.).

Agora, sempre que uma alteração relevante é enviada ao GitHub (`push` ou
`pull request`), o GitHub Actions executa essas mesmas verificações
automaticamente, em um ambiente limpo e reprodutível.

## Fluxo

```mermaid
flowchart TD
    A[Alteração no FinanceBot] --> B[Push ou Pull Request]
    B --> C[GitHub Actions]
    C --> D[npm ci]
    D --> E[Prisma Generate]
    E --> F[Testes]
    F --> G[Lint]
    G --> H[Typecheck]
    H --> I[Build]
    I --> J{Tudo passou?}
    J -->|Sim| K[CI verde]
    J -->|Não| L[CI vermelho]
    L --> M[Corrigir código]
    M --> A
```

## O que o CI faz

- Instala as dependências exatas do `package-lock.json` (`npm ci`).
- Gera o Prisma Client (`npx prisma generate`).
- Roda os testes automatizados (Vitest).
- Roda o lint (ESLint).
- Checa os tipos (TypeScript, `tsc --noEmit`).
- Faz o build de produção (`next build`).

Se qualquer uma dessas etapas falhar, o workflow é marcado como vermelho e a
etapa seguinte não roda.

## O que o CI NÃO faz

- Não realiza deploy.
- Não altera nenhum banco de dados (não roda `migrate deploy`,
  `migrate reset`, `db push` nem `db seed`).
- Não faz merge de Pull Requests — isso continua manual, após revisão.
- Não substitui revisão de código.
- Não utiliza credenciais reais do Neon: o `DATABASE_URL` usado no workflow
  é um valor fictício (`postgresql://user:password@localhost:5432/ci_db`),
  necessário apenas porque `prisma.config.ts` e `prisma generate` esperam a
  variável definida. Nenhuma conexão de rede real é feita com esse valor.
- Não cria nenhuma sessão/usuário real: `BETTER_AUTH_SECRET` no workflow
  também é um valor fictício, necessário só porque `src/lib/auth.ts` é
  importado por rotas e pelo build — mesmo raciocínio do `DATABASE_URL`
  acima.

## Por que `npm ci` e não `npm install`?

`npm ci` instala exatamente as versões registradas em
`package-lock.json`, falhando se o lockfile e o `package.json` estiverem
dessincronizados. `npm install` pode atualizar o lockfile silenciosamente.
Em CI, queremos reprodutibilidade: o mesmo commit deve sempre instalar o
mesmo conjunto de dependências, sem surpresas.

## Por que filtrar por `paths`?

O repositório `aprendizado` é um repositório de estudos com vários projetos
e linguagens diferentes. Sem um filtro de `paths`, qualquer alteração em
qualquer projeto (por exemplo, um script Python não relacionado)
dispararia o CI do FinanceBot desnecessariamente.

O workflow `financebot-ci.yml` só roda quando há mudanças em:

- `bot_wasxtech_finance/**`
- `.github/workflows/financebot-ci.yml` (o próprio workflow)

## Por que Node 22?

O `package.json` não define `engines`, e não há `.nvmrc`/`.node-version`
no projeto. O README documenta "Node.js 20+" como pré-requisito. O CI usa
a versão 22, que é uma LTS ativa, compatível com esse requisito mínimo e
com as versões atuais de Next.js 16 e React 19 usadas no projeto.

## Primeiro erro encontrado pelo CI

A primeira execução do `financebot-ci.yml` no GitHub Actions falhou logo na
etapa `npm ci`, com este erro:

```
npm ci can only install packages when your package.json and
package-lock.json are in sync.

Missing: @emnapi/runtime@1.11.3
Missing: @emnapi/core@1.11.3
```

Localmente, testes, lint, typecheck e build sempre passaram sem problema —
porque a máquina de desenvolvimento (Windows) já tinha um `node_modules`
funcional, instalado antes de o `package-lock.json` existir nesse estado.
O runner do GitHub Actions, por outro lado, parte de uma máquina limpa e
depende inteiramente do que está escrito no lockfile. Foi exatamente isso
que o CI existe para pegar: uma inconsistência que uma máquina "quente"
esconde.

**Causa raiz:** `@emnapi/runtime` e `@emnapi/core` não são dependências
diretas do projeto — ninguém as declara no `package.json`. Elas são
dependências transitivas de variantes **WebAssembly (wasm32)** usadas como
*fallback* multiplataforma por dois pacotes opcionais:

- `sharp` → `@img/sharp-wasm32` (dependência opcional do `next`, usada para
  otimização de imagens) → precisa de `@emnapi/runtime`;
- `@tailwindcss/oxide` → `@tailwindcss/oxide-wasm32-wasi` (dependência
  opcional do `tailwindcss` v4) → precisa de `@emnapi/core` e
  `@emnapi/runtime`.

O `package-lock.json` já continha entradas para `@img/sharp-wasm32` e
`@tailwindcss/oxide-wasm32-wasi`, mas **sem** as entradas de nível
superior para as próprias dependências deles (`@emnapi/*`). Ou seja, o
lockfile referenciava pacotes que ele mesmo não sabia resolver — uma
árvore incompleta. Isso não veio de uma edição manual: o
`package-lock.json` nunca havia sido tocado desde o commit inicial do
projeto, então o problema já existia desde a primeira geração do lockfile.

Uma tentativa de `npm install` incremental (sem apagar o lockfile) não
corrigiu nada — o npm confia na estrutura já registrada e só calcula o
delta em relação ao `package.json`, então não reprocessa uma subárvore
opcional já "presente", ainda que incompleta. A correção só apareceu ao
apagar `package-lock.json` por completo e deixar o npm resolver a árvore
inteira do zero a partir do `package.json`.

**Correção:** apagar `package-lock.json` e `node_modules` e rodar
`npm install` puro (sem `npm update`, sem tocar em nenhuma versão do
`package.json`). O `package.json` não mudou uma linha — confirmado por
`git diff`. Todas as dependências diretas (`next`, `react`, `prisma`,
`zod`, `vitest`, etc.) ficaram resolvidas exatamente nas mesmas versões
de antes; só a árvore transitiva/opcional (incluindo as entradas que
faltavam de `@emnapi/core` e `@emnapi/runtime`) foi completada.

`npm ci` foi mantido como comando de instalação do CI — a causa era o
lockfile incompleto, não o comando. Depois da correção, `npm ci` foi
rodado localmente contra uma instalação limpa (`node_modules` apagado) e
funcionou de ponta a ponta, seguido de `prisma generate`, testes, lint,
typecheck e build — provando que uma máquina limpa consegue reproduzir o
mesmo pipeline do GitHub Actions.

## Segundo erro encontrado pelo CI

Com o `npm ci` corrigido, o pipeline avançou e a próxima etapa,
`npm run typecheck`, falhou com um erro real:

```
src/app/layout.tsx(10,50): error TS2304: Cannot find name 'LayoutProps'.
```

**Causa:** `LayoutProps<'/'>` não é um tipo do projeto nem da biblioteca
`next` — é um tipo **global gerado automaticamente pelo Next.js** dentro de
`.next/types/routes.d.ts`, criado somente quando `next dev` ou
`next build` roda (é o mesmo mecanismo do "typed routes" que também gera
`PageProps` e `RouteContext`). O `tsconfig.json` inclui `.next/types/**/*.ts`
no `include`, então, quando esse arquivo existe, o TypeScript enxerga
`LayoutProps` normalmente.

O problema: `.next/` é gerado e fica fora do Git (`.gitignore`), e a ordem
do pipeline é `test → lint → typecheck → build` — ou seja, `typecheck`
roda **antes** de qualquer `build`. Em uma máquina de desenvolvimento que
já rodou `next dev`/`next build` alguma vez, `.next/types/routes.d.ts`
continua no disco entre execuções, então `npm run typecheck` "funcionava"
localmente por pura coincidência de estado local, não porque o código
estivesse correto. Num checkout limpo (como o runner do GitHub Actions, ou
localmente depois de apagar `.next/`), esse arquivo não existe ainda,
`LayoutProps` não é encontrado, e o TypeScript falha corretamente.

Reproduzi isso localmente apagando `bot_wasxtech_finance/.next/` (artefato
gerado, seguro de remover, sem relação com o Git) e rodando
`npm run typecheck` de novo: o erro se repetiu de forma idêntica ao do CI,
confirmando a causa antes de corrigir qualquer coisa.

**Correção:** o root layout só usa `children` — não precisa de `params`
nem de nenhum outro recurso do tipo gerado. Trocamos a dependência do tipo
gerado por uma tipagem explícita e estável, no mesmo padrão já usado em
`src/components/layout/Shell.tsx` do próprio projeto:

```diff
+import type { ReactNode } from "react";
...
-export default function RootLayout({ children }: LayoutProps<"/">) {
+export default function RootLayout({ children }: { children: ReactNode }) {
```

Nenhum `any`, `@ts-ignore` ou `@ts-expect-error` foi usado — o tipo
correto simplesmente não dependia de arquivo gerado. Validado rodando
`npm run typecheck` com `.next/` completamente ausente (sucesso) e depois
o pipeline inteiro (`prisma generate` → `test` → `lint` → `typecheck` →
`build`, todos passando).

## Terceiro erro: o mesmo problema de lockfile voltou

Depois de corrigir o lockfile pela primeira vez (ver acima), rodei
`npm install better-auth` para adicionar a biblioteca de autenticação.
Um `npm ci` limpo logo em seguida voltou a falhar:

```
npm error Invalid: lock file's @emnapi/wasi-threads@1.2.1 does not satisfy @emnapi/wasi-threads@1.2.3
npm error Missing: @emnapi/core@1.10.0 from lock file
npm error Missing: @emnapi/wasi-threads@1.2.1 from lock file
```

**Causa:** exatamente a mesma classe de problema do primeiro erro —
`npm install <pacote>` faz uma atualização **incremental** do lockfile
(calcula só o delta em relação ao que já está registrado), e essa
atualização incremental não resolve por completo a subárvore opcional
`wasm32`/`@emnapi/*` usada por `sharp` (via `next`) e por
`@tailwindcss/oxide`. Isso confirma que o problema não é pontual — é uma
característica de como o npm atualiza lockfiles incrementalmente nesta
árvore de dependências específica, e vai se repetir toda vez que uma
dependência nova for adicionada com `npm install <pacote>`.

**Correção:** a mesma de antes — apagar `package-lock.json` por completo
e rodar `npm install` (sem argumentos) para forçar uma resolução completa
do zero a partir do `package.json`. Confirmado por comparação campo a
campo que nenhuma dependência direta mudou de versão; só a árvore
transitiva/opcional foi completada.

**Consequência prática:** ao adicionar qualquer dependência nova a este
projeto, depois de `npm install <pacote>`, rode `npm ci` uma vez para
confirmar que o lockfile ficou consistente. Se falhar com um erro
`Missing: ... from lock file`, apague `package-lock.json` e rode
`npm install` do zero antes de continuar — não tente contornar com
`npm install` incremental de novo, ele não resolve esse problema
específico.

Isso ilustra bem o valor incremental do CI: corrigir um problema não
"resolve tudo" de uma vez — ele deixa o pipeline avançar até o próximo
problema real, que só aparece quando o anterior para de mascará-lo.

## Vulnerabilidades conhecidas (`npm audit`)

`npm audit` reporta 4 vulnerabilidades de severidade alta, todas nas
mesmas duas origens:

- `deepmerge-ts` (stack exhaustion em merge recursivo)
- `mysql2` (downgrade de auth plugin / decompression bomb)

Ambas são dependências **transitivas do pacote `prisma`** (a CLI, em
`devDependencies` — não do `@prisma/client`, que é o que roda em
produção). `prisma` inclui suporte a múltiplos bancos na sua ferramenta
de linha de comando, então carrega `mysql2` mesmo este projeto usando só
PostgreSQL. Nenhum dos dois pacotes é importado pelo código da aplicação
nem roda no servidor em produção — o uso real é só durante
desenvolvimento/CI (`prisma generate`/`migrate`).

A única correção automática disponível (`npm audit fix --force`)
rebaixaria `prisma` para `6.19.3` — uma mudança **breaking** que
desfaria toda a configuração do Prisma 7 deste projeto
(`prisma.config.ts`, driver adapters). Por isso não foi aplicada.
Tratamento: acompanhar novas versões 7.x do `prisma` que atualizem essas
dependências transitivas, sem downgrade.

## `postinstall: prisma generate`

Adicionado ao `package.json` porque a Vercel (e qualquer ambiente que não
seja este CI) roda só `npm install` + `next build` — sem o passo
explícito de `Generate Prisma Client` que este workflow declara à parte.
Sem `postinstall`, o build falharia lá pelo mesmo motivo que já vimos
aqui: `@prisma/client` não existe até alguém rodar `prisma generate`. O
passo explícito no workflow continua existindo por clareza/documentação
do pipeline; rodar `prisma generate` duas vezes (postinstall + passo
explícito) é redundante, mas inofensivo (idempotente).

## Próximos passos (futuro, não implementado agora)

Este repositório pode vir a ter workflows independentes para outros
projetos/ecossistemas, por exemplo:

- `python-ci.yml`
- `php-ci.yml`
- `java-ci.yml`

Cada um desses workflows deve observar (via `paths`) apenas os arquivos do
projeto correspondente — assim como `financebot-ci.yml` só observa
`bot_wasxtech_finance/**`.

Antes de criar um novo workflow, vale analisar, para aquele projeto
específico:

- qual linguagem/runtime ele usa e qual versão;
- como as dependências são instaladas;
- se existem testes automatizados;
- se existe lint configurado;
- se existe um passo de build.

A ideia é que CI seja adicionado quando existir uma justificativa real
(testes, lint, build existentes), e não simplesmente porque uma extensão
de arquivo (`.py`, `.php`, `.java`) existe no repositório.

Também podem ser adicionados, no futuro, para o FinanceBot especificamente:

- badge de status do workflow no README;
- cache mais específico;
- verificações adicionais (cobertura de testes, CodeQL, etc.).

Nenhum desses itens é necessário para este primeiro CI — o objetivo aqui
era entender e validar o fundamento (checkout, setup, install, generate,
test, lint, typecheck, build) antes de adicionar complexidade.

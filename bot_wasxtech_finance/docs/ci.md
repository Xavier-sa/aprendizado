# Integração Contínua

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

# Segurança

## Preferência de aparência (local)

A API valida sessão real e expiração; `userId` vem exclusivamente da sessão.
PATCH aceita apenas theme predefinido e rejeita campos extras, query de
targeting e origem cross-site. Respostas são no-store. Preview/root data-theme
são apresentação, nunca autorização; nenhum estado visual concede ADMIN.
Preferência acompanha a conta no banco, sem localStorage/cookie compartilhado.
Logout restaura a aparência pública. Ver [phase-4-appearance.md](./phase-4-appearance.md).

## Acesso administrativo (implementação local)

Autenticação e autorização são distintas: Better Auth confirma identidade;
o papel atual no banco determina acesso administrativo. Cada página/API
administrativa possui guard server-side, além do proxy e layout. API retorna
401 sem sessão válida e 403 para USER; ADMIN atual pode consultar dados
globais. Revogação não depende de atualização de cookie ou estado cliente.
O hook público rejeita explicitamente qualquer `role` em cadastro/perfil.

Administradores autorizados podem consultar contas e movimentações para
operação/suporte, como informado em `/privacy`. As projeções administrativas
excluem hashes, tokens e sessões; APIs não permitem cache. Ownership das
rotas comuns permanece intacto. Não há promoção, mutação administrativa ou
auditoria persistente nesta fase. Ver [phase-3-admin.md](./phase-3-admin.md).

## Princípio central

**O navegador nunca é uma fronteira de confiança.** Assumimos que quem usa
o FinanceBot tem acesso completo ao DevTools — Network, Console,
Application/Cookies, e pode disparar requisições manuais via curl/Postman
alterando qualquer campo do body, query string ou IDs. O FinanceBot não
tenta impedir isso (é impossível e não é o modelo de segurança adequado).
**Toda autorização é decidida no servidor**, a partir da sessão validada
— nunca a partir de algo que o cliente afirma sobre si mesmo (um
`userId` no body, um ID na URL, um campo escondido na UI).

Esta auditoria assumiu um atacante que conhece todo o código
frontend, todos os endpoints, todos os IDs que conseguir observar e o
formato exato das requisições — e verificou que a autorização continua
correta mesmo assim.

## Sessão: cookie HttpOnly, nunca token em JS

A sessão vive num cookie (`better-auth.session_token`, ou
`__Secure-better-auth.session_token` quando servido por HTTPS — ver
abaixo), nunca em `localStorage`/`sessionStorage`. Atributos confirmados
por inspeção direta da resposta HTTP (`Set-Cookie`):

| Atributo | Valor | Observação |
|---|---|---|
| `HttpOnly` | sim | JavaScript não consegue ler via `document.cookie` |
| `SameSite` | `Lax` | bloqueia o cookie em navegações cross-site que não sejam GET top-level |
| `Path` | `/` | |
| `Max-Age` | `604800` (7 dias) | |
| `Secure` | automático | ver abaixo |

**`Secure` é decidido pelo protocolo real da requisição**, não por uma
flag fixa (confirmado lendo `node_modules/better-auth/dist/cookies/index.mjs`):
se a requisição chega como `https://`, o cookie recebe `Secure` **e** o
prefixo `__Secure-` no nome (reforço adicional que o próprio navegador
exige HTTPS para aceitar o cookie). Em desenvolvimento local
(`http://localhost`), `Secure` fica ausente de propósito — é o
comportamento correto, forçar `Secure` sobre HTTP quebraria o cookie
completamente. Na Vercel (HTTPS por padrão), `Secure` liga sozinho, sem
nenhuma configuração nossa.

### Sobre o campo `token` no JSON de cadastro/login

`POST /api/auth/sign-up/email` e `/sign-in/email` devolvem
`{ token, user }` no corpo da resposta — confirmado lendo o código-fonte
do Better Auth (`sign-up.mjs`): é o **mesmo valor** já enviado como
cookie `HttpOnly`, incluído deliberadamente pela biblioteca para permitir
clientes que não usam cookie (apps mobile, integrações via Bearer token).

Nosso app **não usa** esse valor — nenhum plugin Bearer foi habilitado, e
`src/app/sign-in/page.tsx`/`sign-up/page.tsx` só leem `{ error }` do
retorno, nunca `data.token`. O risco residual é estritamente de
XSS: se um script malicioso conseguisse rodar na página, ele poderia ler
esse campo via `fetch(...).then(r => r.json())` — algo que **não
conseguiria fazer** com o cookie `HttpOnly` equivalente. Isso não é uma
lacuna introduzida por nós: é um comportamento documentado e incondicional
do endpoint (não há uma flag oficial para omiti-lo sem reescrever a
resposta via hook interno não estabilizado na documentação da versão
1.7.5 — optamos por não usar uma API não documentada para um fluxo crítico
como login/cadastro). Mitigação real: a CSP (abaixo) e o fato de não
usarmos `dangerouslySetInnerHTML` em lugar nenhum do código já reduzem a
superfície de XSS que exploraria isso.

## Autorização: userId sempre vem da sessão, nunca do cliente

Toda consulta/gravação de `Transaction` e `Category` recebe `userId`
como parâmetro **explícito**, obtido de `getUserId(request)` →
`auth.api.getSession()` — nunca de um campo `userId` no body, query
string ou draft do chat. Testado e confirmado (ver `PENDÊNCIAS`/relatório
da sessão): enviar `{"userId": "<id de outro usuário>"}` no body de
`POST /api/transactions` é silenciosamente ignorado — a movimentação é
sempre criada em nome de quem está autenticado.

`update`/`delete` usam `updateMany`/`deleteMany` com
`where: { id, userId }` (nunca só `{ id }`): tentar alterar/apagar um
registro de outra pessoa não afeta nenhuma linha, e o controller
responde com o mesmo erro genérico usado para IDs inexistentes — ver
"Enumeração de IDs" abaixo.

## Mass assignment

Todo `POST`/`PATCH` passa por um schema Zod explícito
(`createTransactionSchema`/`updateTransactionSchema`) antes de tocar no
banco. Por padrão, `z.object()` **descarta** chaves não declaradas —
confirmado com um teste automatizado
(`src/schemas/transaction.schema.test.ts`) que envia `userId`, `id`,
`createdAt`, `updatedAt` manualmente e verifica que nenhum deles chega ao
objeto validado. Além disso, os `services` nunca fazem
`prisma.create({ data: input })` (spread direto) — sempre constroem o
objeto campo a campo, então mesmo um Zod mal configurado não seria
suficiente para injetar um campo que o código não lista explicitamente.

**Lacuna encontrada e corrigida nesta auditoria:** o fluxo de confirmação
do chat (`context.draft`, ecoado pelo cliente entre mensagens — ver
"Por que o chat não guarda estado no servidor" em
[architecture.md](./architecture.md)) criava a movimentação diretamente a
partir do `draft` recebido, **sem** passar de novo pelo Zod. Um usuário
podia alterar `draft.amount` para um valor negativo no DevTools antes de
responder "sim". Corrigido em `chat.controller.ts`: o mesmo
`createTransactionSchema` da API REST agora valida o `draft` antes de
criar a movimentação, também no chat.

## Categorias

Categoria é global (`userId` nulo, visível a todos) ou pessoal
(`userId` do dono, visível só para ele) — ver ADR-008 em
[decisions.md](./decisions.md). `categoryRepository.findById` já filtra
por essa regra de visibilidade, então `transactionService.create/update`
rejeita qualquer `categoryId` que não seja global nem do usuário
autenticado, com a mesma mensagem genérica "Categoria não encontrada" —
testado tanto via API REST quanto via chat (`context.draft.categoryId`
manipulado com o ID de uma categoria privada de outro usuário).

## Enumeração de IDs

Para qualquer recurso que exista mas pertença a outro usuário, a resposta
é idêntica à de um ID que não existe: `404` / `"Movimentação não
encontrada"` (ou `400`/`"Categoria não encontrada"` para categoria). O
cliente nunca descobre, pela resposta, se um ID é inválido ou só não é
dele.

## Respostas das APIs — DTOs explícitos

Nenhum endpoint devolve uma linha crua do Prisma:

- `TransactionDTO` (já existia): id, description, amount, type,
  categoryId, categoryName, paymentMethod, transactionDate,
  originalMessage — sem `userId`.
- `DashboardSummary`/`MonthlyChartPoint`: totais calculados, nunca
  expõem `userId` nem IDs de outras entidades.
- **Corrigido nesta auditoria:** `/api/categories` e as opções de
  categoria dentro das respostas do chat devolviam a linha completa do
  Prisma (`id, name, type, userId, createdAt, updatedAt`).
  `category.repository.ts` agora usa `select: { id, name, type }` em
  `findAll`/`findByType` — o próprio Postgres nunca envia os outros
  campos para a aplicação, então não há como eles vazarem por engano em
  uma resposta futura.

## Senhas

Gerenciadas inteiramente pelo Better Auth: hash fica em
`Account.password` (nunca em texto puro, nunca no objeto `User`), nunca
aparece em nenhuma resposta JSON (`parseUserOutput` do Better Auth já
exclui esse campo) e o projeto não tem nenhum `console.log` em lugar
nenhum do código (`src/`) que pudesse vazá-la em log. Não implementamos
hashing próprio — usamos exclusivamente o mecanismo do Better Auth.

## Erros: nada de detalhe interno para o cliente

**Lacuna encontrada e corrigida nesta auditoria:** `transaction.controller.ts`
e `chat.controller.ts` repassavam `error.message` de **qualquer**
exceção capturada — inclusive um eventual erro real do Prisma/banco
(que pode conter nome de tabela, tipo de erro interno, etc.), não só os
erros pensados para o usuário ("Categoria não encontrada").

Corrigido com uma classe `AppError` (`src/lib/errors.ts`): só uma
mensagem lançada deliberadamente como `AppError` chega ao cliente.
Qualquer outro erro vira uma mensagem genérica ("Erro inesperado") com
status `500`, e o erro real é só registrado no `console.error` do
servidor (visível nos logs da Vercel, nunca na resposta HTTP).
Aplicado em todos os controllers (`transaction`, `chat`, `dashboard`,
`categories`).

## Headers

`next.config.ts` define, para todas as rotas:

- **Content-Security-Policy**: `default-src 'self'` + `frame-ancestors
  'none'` + `object-src 'none'` + `base-uri 'self'` + `form-action
  'self'`, restringindo script/style/img/font/connect a `'self'`. O
  projeto não usa nenhum recurso externo (sem CDN, sem fonte do Google,
  sem script de terceiro — verificado antes de escrever a política).
  `script-src` inclui `'unsafe-inline'` porque o App Router do Next.js
  injeta scripts inline próprios de hidratação
  (`self.__next_f.push(...)`) em toda página — confirmado inspecionando
  o HTML renderizado. A alternativa mais estrita (nonce por requisição,
  [documentada oficialmente](https://nextjs.org/docs/app/guides/content-security-policy))
  exigiria desativar a renderização estática de `/`, `/sign-in` e
  `/sign-up`, um custo de performance que não se justifica para o
  ganho de segurança aqui — é a mesma política "sem nonce" que a própria
  documentação do Next.js apresenta como padrão razoável.
- **X-Content-Type-Options**: `nosniff`.
- **X-Frame-Options**: `DENY` (reforça o `frame-ancestors 'none'` da CSP
  em navegadores mais antigos).
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: desabilita câmera, microfone, geolocalização e
  pagamento — nenhum é usado pelo app.

## CSRF

Tratado inteiramente pelo Better Auth — nenhuma proteção duplicada foi
criada. Confirmado lendo `node_modules/better-auth/dist/api/middlewares/origin-check.mjs`:
toda requisição que não seja `GET`/`HEAD`/`OPTIONS` e que carregue um
cookie de sessão precisa ter um header `Origin` (ou `Referer`) que
bata com `trustedOrigins` (por padrão, a própria `baseURL` da aplicação)
— sem isso, `403 FORBIDDEN`. Reproduzido manualmente: uma chamada sem
`Origin` a `/api/auth/sign-out` foi recusada com
`MISSING_OR_NULL_ORIGIN`; com `Origin: http://localhost:3000` (o próprio
site), funcionou. Há ainda uma segunda camada (`Sec-Fetch-Site`/`Mode`)
que bloqueia especificamente navegação cross-site para login.

## Rate limiting

O Better Auth já vem com um limitador embutido (em memória, sem
dependência externa), **habilitado automaticamente em produção**
(`NODE_ENV=production`), com regras mais rígidas já definidas pela
própria biblioteca para os endpoints sensíveis (confirmado lendo
`node_modules/better-auth/dist/api/rate-limiter/index.mjs`):

| Rotas | Janela | Máximo |
|---|---|---|
| `/sign-in`, `/sign-up`, `/change-password`, `/change-email` | 10s | 3 requisições |
| `/forget-password`, `/send-verification-email` | 60s | 3 requisições |

Nenhuma configuração nossa foi necessária para isso — já vem pronto.

**Ressalva real:** o armazenamento padrão é em memória do processo.
Funções serverless (Vercel) podem não manter o mesmo processo entre
requisições, então esse contador pode "zerar" com mais frequência do que
em um servidor tradicional sempre ligado — a proteção efetiva pode ser
mais fraca do que os números sugerem em produção serverless sem um
`secondaryStorage` compartilhado (ex.: Redis/Vercel KV).

**Pendência (proposta, não implementada):** `/api/chat` e as demais
rotas próprias (`/api/transactions`, `/api/categories`, `/api/dashboard`)
não têm nenhum rate limit — o limitador do Better Auth cobre só as
rotas dele. Proposta simples, sem serviço pago, para quando fizer
sentido: um limitador em memória por IP dentro de `src/proxy.ts` (mesma
ideia do Better Auth: `Map` com contagem por janela de tempo), sujeito à
mesma ressalva de memória-por-processo em serverless. Não implementado
agora porque teria a mesma limitação de confiabilidade em produção
serverless sem armazenamento compartilhado — melhor decidir isso junto
com a escolha de infraestrutura de deploy.

## O que ainda falta (antes de exposição pública ampla)

- Verificação de e-mail / recuperação de senha.
- Rate limiting em `/api/chat` e demais rotas próprias (proposta acima).
- Armazenamento compartilhado (Redis/KV) para rate limiting confiável em
  ambiente serverless, se o tráfego justificar.

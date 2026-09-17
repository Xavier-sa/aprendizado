# Autenticação

Ver também [ADR-008](./decisions.md#adr-008--autenticação-com-better-auth-e-propriedade-dos-dados)
para o porquê da escolha, e [database.md](./database.md) para as tabelas.

## Biblioteca

[Better Auth](https://www.better-auth.com), com o adapter Prisma nativo
(`better-auth/adapters/prisma`) e login por e-mail/senha habilitado.

## Peças

- `src/lib/auth.ts` — configuração central (`betterAuth(...)`), usada no
  servidor.
- `src/lib/auth-client.ts` — cliente (`better-auth/react`), usado em
  Client Components para login/logout/cadastro.
- `src/app/api/auth/[...all]/route.ts` — rota única que expõe toda a API
  do Better Auth (login, cadastro, logout, sessão).
- `src/lib/session.ts` — `getUserId(request)`, usado pelos controllers
  para obter o usuário autenticado a partir da sessão real (não confia no
  cookie sozinho).
- `src/proxy.ts` — camada rápida de proteção (Next.js 16 renomeou
  `middleware.ts` para `proxy.ts`). Só confere se existe um cookie de
  sessão, para não fazer uma consulta ao banco a cada requisição.
- `src/app/sign-in/page.tsx` e `src/app/sign-up/page.tsx` — telas
  públicas (fora do grupo `(app)`), usam `authClient.signIn.email` /
  `authClient.signUp.email`.
- `src/components/layout/LogoutButton.tsx` — usado no `Sidebar` (desktop)
  e `MobileNav` (mobile); chama `authClient.signOut()` e redireciona para
  `/sign-in`.
- `src/app/(app)/layout.tsx` — grupo de rotas que envolve só as páginas
  autenticadas (`dashboard`, `chat`, `transactions`) com a navegação
  (`Shell`/`Sidebar`/`MobileNav`). A landing (`/`) e as telas de auth
  ficam fora desse grupo, sem a navegação autenticada.

## Duas camadas de proteção (de propósito)

1. **`src/proxy.ts`** — checagem rápida (só cookie) em páginas
   (`/dashboard`, `/chat`, `/transactions`) e nas APIs correspondentes.
   Sem cookie: redireciona (páginas) ou responde `401` (APIs). É uma
   otimização, não a fonte da verdade.
2. **Controllers** (`src/lib/session.ts` → `auth.api.getSession`) —
   validação real da sessão no banco, feita em cada controller antes de
   tocar em qualquer dado. Esta é a camada que realmente importa para
   segurança; a Fase 1 existe só para não gastar uma consulta ao banco em
   toda requisição não autenticada.

## Variáveis de ambiente

`BETTER_AUTH_SECRET` (mín. 32 caracteres, gerar com `openssl rand -base64
32` ou equivalente) e `BETTER_AUTH_URL` (URL pública da aplicação). Nunca
reutilizar o mesmo `BETTER_AUTH_SECRET` entre ambientes.

## Fluxo implementado

```
Visitante → "/" (landing pública)
  → "Entrar" → /sign-in → authClient.signIn.email → /dashboard
  → "Criar conta" → /sign-up → authClient.signUp.email (login automático) → /dashboard
Usuário autenticado → LogoutButton (Sidebar/MobileNav) → authClient.signOut() → /sign-in
```

Quem já tem sessão ativa é redirecionado para `/dashboard` se tentar
abrir `/sign-in` ou `/sign-up` de novo (ver `src/proxy.ts`).

Validado com um smoke test manual real (dois usuários de teste, e-mails
`smoketest-a@example.com`/`smoketest-b@example.com`, removidos depois do
teste): cadastro, login automático pós-cadastro, criação de movimentação
pelo chat, consulta de saldo, isolamento total entre os dois usuários
(inclusive tentativa de A editar/excluir dado do outro, bloqueada com
`404`), logout revogando a sessão sem afetar a do outro usuário.

## O que NÃO está implementado ainda

- Verificação de e-mail e recuperação de senha (exigiriam um provedor de
  e-mail — fora de escopo por enquanto, ver roadmap).
- Login social (Google, etc.) — a modelagem (`Account`) já suporta,
  bastaria configurar `socialProviders` em `src/lib/auth.ts` quando
  necessário.

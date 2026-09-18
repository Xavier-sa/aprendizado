# Fase 2: autorização administrativa

Implementação local para revisão. Migration gerada por `prisma migrate diff`
entre o schema anterior e o novo, sem conexão com o Neon. Não aplicada em
produção. Não há promoção de usuários, deploy nem interface administrativa.

## Schema e migration

O schema completo está em [schema.prisma](../prisma/schema.prisma).
Únicas mudanças de modelagem:

```prisma
enum UserRole {
  USER
  ADMIN
}

// Dentro de User, sem mudanças nos demais campos/relações:
role UserRole @default(USER)
```

SQL gerado em
`prisma/migrations/20260918200000_add_user_role/migration.sql`:

```sql
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';
```

Todos os usuários existentes receberão `USER`. Novos usuários também começam
como `USER`. Nenhum usuário, categoria, transação, relação ou sessão é removido.
A alteração de tabela exige um lock breve; janela de execução e validação em
produção ficam para a fase aprovada de migration.

Rollback conceitual: retornar primeiro ao código anterior e manter a coluna
aditiva é a alternativa que preserva também os papéis. Se houver decisão de
reverter o schema, remover exclusivamente `User.role` e depois o enum
`UserRole`, com migration reversa revisada. Isso perderia as atribuições de
papéis, mas preservaria usuários e dados financeiros. Não executar esse
rollback enquanto o código novo depender da coluna. Nenhum rollback executado.

## Fronteiras de segurança

- Better Auth recebe `role` como campo server-owned (`input: false`, default
  `USER`). Um hook independente rejeita explicitamente qualquer body com a
  propriedade `role`, inclusive valores vazios ou nulos, antes da operação.
  Cadastro e atualização de perfil não podem atribuir papéis.
- `getAdminAccess` valida a sessão pelo Better Auth com cache de cookie
  desabilitado e verifica a expiração. Consulta `User.role` atual no banco em
  cada chamada. Não usa o papel informado pela sessão, headers ou cliente.
- Sem sessão válida ou com usuário removido: API `401`, página redireciona
  para `/sign-in`. Usuário comum: API `403`, página vai para `/dashboard`.
  ADMIN atual: acesso permitido. Erros de banco/sessão não concedem acesso.
- Proxy protege `/admin`, `/admin/*`, `/api/admin` e `/api/admin/*` antes de
  qualquer atalho por presença de cookie. Layout e página possuem guard
  server-side adicional. `/admin` retorna conteúdo vazio nesta fase.
- O catch-all de API cobre todos os métodos usuais. ADMIN recebe `404` porque
  nenhum recurso administrativo foi implementado; USER recebe `403` e
  ausência de sessão recebe `401`. Respostas de API não são armazenáveis.
- Futuras páginas, Server Actions e handlers administrativos devem chamar o
  guard antes de consultar/alterar dados. Não depender somente do layout,
  pois ele pode ser reutilizado na navegação. Handlers específicos terão
  precedência sobre o catch-all e precisam do próprio `requireAdminApi`.
- Nenhuma mudança nas consultas financeiras e nos filtros de ownership.
  Não há endpoint de promoção/rebaixamento ou plugin administrativo do
  Better Auth habilitado.

## Verificação automatizada

`auth-policy.test.ts` usa o handler real do Better Auth com adapter em memória
para provar cadastro rejeitado com `role`, cadastro normal com `USER`,
autopromoção rejeitada, atualização normal de perfil, cookie falsificado e
sessão real expirada. Não acessa produção.

`admin-access.test.ts` testa guards, proxy, página, layout e todos os métodos
do catch-all, com sessão/banco controlados: `401`, `403`, ADMIN permitido,
usuário removido, falha do banco e revogação imediatamente observada apesar
de a sessão ainda informar `ADMIN`. A execução não substitui o futuro smoke
test em ambiente isolado com PostgreSQL após aprovação da migration.

Resultado da execução local:

| Comando | Resultado |
|---|---|
| `npm test` | 80 testes aprovados em 10 arquivos (25 novos nesta fase) |
| `npm run lint` | Aprovado |
| `npm run typecheck` | Aprovado |
| `npm run build` | Aprovado; `/admin` e API administrativa dinâmicos |
| `prisma validate` | Schema válido |

Build e comandos Prisma usaram `DATABASE_URL` fictícia para localhost e
variáveis de autenticação fictícias. Nenhum segredo exibido ou alterado.
Aplicar a migration aprovada deve preceder qualquer publicação deste código,
pois o adapter e o guard passam a depender da coluna `User.role`.

## Requisito para a fase de temas

O contraste atual de aproximadamente **3,60:1**, identificado no diagnóstico,
deve ser corrigido nos novos design tokens. As cinco paletas não podem
simplesmente reproduzir a combinação atual. Validar cada par texto/fundo,
incluindo botões e estados interativos; texto normal deve alcançar ao menos
4,5:1. Nenhuma paleta, `UserPreference` ou sistema de temas criado nesta fase.

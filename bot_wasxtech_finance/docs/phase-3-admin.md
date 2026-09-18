# Fase 3: consultas administrativas

Implementação local após aprovação da Fase 2. Não publicada. A migration
aditiva de `User.role` continua pendente de autorização para o Neon.
Nenhuma conta promovida e nenhuma nova migration necessária nesta fase.

## Páginas e APIs

| Página | API GET | Conteúdo |
|---|---|---|
| `/admin` | `/api/admin/dashboard` | Usuários, registros, receitas, despesas, volume e últimos 12 meses |
| `/admin/users` | `/api/admin/users` | Nome, e-mail, papel, cadastro e contagem de registros |
| `/admin/users/[id]` | `/api/admin/users/[id]` | Resumo financeiro e registros do usuário selecionado |
| `/admin/transactions` | `/api/admin/transactions` | Consulta global paginada com filtros |

Tudo é somente leitura. Não há edição/exclusão de dados financeiros ou
mudança de papel. Volume é a soma de receitas e despesas **registradas**,
nunca dinheiro pertencente à plataforma. A série mensal agrega no banco
pela data da movimentação, limita-se aos últimos 12 meses e omite meses
sem registros. Totais financeiros são calculados com Decimal e enviados
na API como strings com duas casas decimais.

Listagens: 25 registros por padrão, `pageSize` entre 1 e 100, `page` de 1
a 10000, ordenação com desempate por ID. Busca de usuários por nome/e-mail;
movimentações por descrição, `userId`, `categoryId`, `type`, `from` e `to`.
Datas `YYYY-MM-DD` usam UTC e incluem o dia final inteiro. Campos desconhecidos,
duplicados, limites inválidos e datas inválidas/invertidas retornam `400`.
O filtro do detalhe é sempre fixado no ID da URL, mesmo que a query envie
outro `userId`. Um usuário inexistente retorna `404`.

Filtros por usuário e categoria aceitam IDs; a lista de usuários oferece
o detalhe e os cartões de movimentação oferecem links para filtrar por
categoria. Não são carregadas listas globais ilimitadas para montar selects.

## Segurança e privacidade

Autenticação confirma identidade; autorização decide a permissão atual.
Cada página e cada controller administrativo chama seu guard antes dos
dados, além do proxy e layout. O papel atual vem do banco a cada chamada;
nenhum papel enviado pelo cliente ou antigo na sessão autoriza acesso.
Sem sessão válida: `401`/login. USER: `403`/dashboard. ADMIN: permitido.
Revogação vale na requisição seguinte; erros falham sem conceder acesso.

O novo `admin.repository.ts` concentra consultas globais. Repositories,
services e controllers financeiros comuns continuam com ownership intacto.
Projeções explícitas excluem hashes, tokens, sessões e dados de autenticação.
Respostas de API usam `Cache-Control: no-store`. Mensagens de falha não
repassam detalhes do banco; páginas usam error boundary genérico.

A página pública `/privacy`, vinculada à landing e ao cadastro, informa
que administradores autorizados podem consultar contas e registros para
operação/suporte. Não promete ocultar esses dados do administrador.

Auditoria avaliada: não foram introduzidas operações administrativas de
escrita ou promoção, portanto não foi criada `AdminAuditLog` nesta fase.
Auditoria persistente de leituras sensíveis é uma evolução a decidir antes
de ampliar o uso administrativo; não há promessa de trilha de auditoria
persistida no MVP. Nenhum segredo ou conteúdo financeiro é escrito em logs
pelo novo controller.

## Interface e validação

Reutiliza Shell, Sidebar, MobileNav, Card e controles existentes. Menu
administrativo separado, com retorno à área pessoal e logout. Listas usam
cartões responsivos, texto longo quebra linhas e filtros empilham no mobile.
Páginas e APIs administrativas são dinâmicas; nenhum dado privado é
prerenderizado durante o build.

Testes cobrem handlers reais, páginas server-side e repository: acesso
USER/sem sessão/ADMIN, revogação, projeções seguras, paginação, filtros,
Decimal, usuário desconhecido e detalhe fixado na conta selecionada.
Testes anteriores de ownership e proteção de role permanecem ativos.
Dependências de sessão/banco são controladas; testes não acessam produção.
Validação integrada com PostgreSQL em ambiente isolado fica para execução
após aprovação explícita da migration/ambiente.

Temas, `UserPreference`, promoção inicial, deploy e operações de escrita
no Git continuam fora desta entrega. O requisito de corrigir contraste
de aproximadamente 3,60:1 nas cinco paletas está mantido na Fase 4.

## Resultados locais

| Verificação | Resultado |
|---|---|
| `npm test` | 126 testes em 13 arquivos aprovados; 46 testes adicionados na Fase 3 |
| `npm run lint` | Aprovado |
| `npm run typecheck` | Aprovado |
| `npm run build` | Aprovado; todas as páginas/APIs administrativas dinâmicas |
| Responsividade | 4 páginas × 7 larguras: 28 cenários sem overflow horizontal |

Responsividade medida no Edge headless com viewport real de 320, 375, 390,
430, 768, 1024 e 1440 px, usando HTML renderizado dos componentes reais,
Shell/layout raiz e CSS do build, com dados fictícios. Foram inspecionadas
capturas de tela. Isso valida layout, não navegação hidratada ou autenticação
integrada ao PostgreSQL. Relatório JSON e screenshots locais ficam em
`.vercel/phase3-preview` (ignorados pelo Git).

Build usou variáveis fictícias; nenhuma conexão com o Neon foi necessária.
Nenhum segredo exibido, migration aplicada, usuário promovido ou deploy feito.

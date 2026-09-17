# Roadmap

## Feito (v0.5 — multiusuário)

Projeto preparado para ficar público como portfólio (ver
[authentication.md](./authentication.md) e ADR-008 em
[decisions.md](./decisions.md)):

- [x] Modelagem: `User`/`Session`/`Account`/`Verification` (Better Auth),
  `Transaction.userId` obrigatório, `Category` híbrida (padrão do sistema
  + personalizada por usuário).
- [x] Isolamento no backend: repositories/services/controllers exigem
  `userId` em toda consulta a `Transaction`/`Category`.
- [x] Proteção de rotas (`src/proxy.ts`) e das APIs correspondentes.
- [x] Migration aplicada no Neon (as 2 transações de teste foram removidas
  antes, por `id` explícito).
- [x] Telas de login (`/sign-in`) e cadastro (`/sign-up`), com logout no
  Sidebar/MobileNav.
- [x] Landing pública em `/`.
- [x] Testes automatizados de isolamento entre usuários (repository e
  chat controller).
- [x] `postinstall: prisma generate` para a Vercel.
- [x] Smoke test manual com dois usuários reais provando o isolamento de
  ponta a ponta (dados removidos depois do teste).

## Pendente antes do deploy público

- Verificação de e-mail / recuperação de senha (exige provedor de
  e-mail — fora de escopo por enquanto).
- Ver [docs/deployment.md](./deployment.md) para o que falta
  especificamente para publicar na Vercel.

## Feito (v0.1 – v0.4)

- **v0.1** — Modelagem, Prisma, migrations, seed fictício, CRUD de
  movimentações (API + UI em `/transactions`).
- **v0.2** — Dashboard com saldo, receitas/despesas do mês, resultado
  mensal, contagem de movimentações e 4 gráficos (Recharts).
- **v0.3** — Chat com parser determinístico: registra movimentações a
  partir de linguagem natural, com confirmação e pedido dos campos que
  faltarem (nunca inventa categoria ou valor).
- **v0.4** — Consultas conversacionais (saldo, gastos por categoria,
  comparação entre meses, etc.) e comandos de edição pelo chat (apagar
  último lançamento, corrigir valor/categoria/data, apagar com
  desambiguação quando há mais de um candidato).

## Futuro (sem previsão)

Nada abaixo está implementado. Serão adicionados conforme surgirem
necessidades reais de uso, não por completude:

- Contas recorrentes
- Orçamento mensal
- Cartão de crédito e parcelamento
- Metas financeiras
- Reserva de emergência
- Acompanhamento de patrimônio / investimentos
- Importação de extratos (CSV, OFX)
- Exportação de dados
- PWA
- Uso opcional de um LLM no parser (documentado explicitamente se/quando
  acontecer — ver seção sobre IA no README)

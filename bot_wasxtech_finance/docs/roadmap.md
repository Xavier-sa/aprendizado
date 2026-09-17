# Roadmap

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
- Autenticação e múltiplos usuários
- PWA
- Uso opcional de um LLM no parser (documentado explicitamente se/quando
  acontecer — ver seção sobre IA no README)

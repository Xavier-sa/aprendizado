# Revisão antes da publicação

| Área | Evidência e ação pendente |
| --- | --- |
| LGPD | Confirmar a identidade do controlador e testar o canal de atendimento. Inventariar dados, bases legais, acessos, logs, backups, prazos e descarte. Validar os contratos e eventuais transferências internacionais da Vercel e do Neon. |
| Dados antigos | Revisar registros históricos e backups que possam conter CPF, Pix ou conta. A API agora omite o campo antigo. Planejar descarte documentado sem excluir registros indiscriminadamente. |
| Incidentes | Definir responsável, registro de incidentes e resposta. Avaliar risco ou dano relevante e os prazos vigentes de comunicação aos titulares e à ANPD. |
| Financeira | Manter registro manual e planejamento. Revisar o enquadramento antes de recomendar investimentos individualmente, movimentar valores ou integrar serviços de pagamento. |
| Fiscal | Confirmar operador, município e modelo de receita com contador. Antes de cobrar ou aceitar patrocínio, publicidade ou contribuições financeiras, verificar cadastro, emissão de documento fiscal e tributação aplicável. |
| Administrativa | Formação em Gestão Pública não determina vínculo funcional. Se houver cargo ou emprego público, verificar o regime aplicável, conflito de interesses e regras de dedicação com a unidade competente. Manter recursos, identidade institucional e dados públicos separados. |
| Segurança | Validar proteção CSRF, limitação de tentativas de login, trilha de auditoria de ações administrativas, proteção do segredo de sessão e isolamento do banco entre ambientes. Testar backup, restauração e a revogação de acesso. |
| Conteúdo e licença | Confirmar titularidade e licença do código, avatar, voz, música e imagens antes de publicar. Atualizar a captura de depósito, que ainda mostra o campo antigo. |

Fontes oficiais para revisão

- [LGPD](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
- [Transferência internacional de dados — ANPD](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024)
- [Comunicação de incidentes — ANPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis)
- [Consultoria de valores mobiliários — CVM](https://conteudo.cvm.gov.br/legislacao/resolucoes/resol019.html)
- [Regime federal e vedações — Lei nº 8.112](https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm)

O CI verifica regressões técnicas e presença dos documentos. Guarde o parecer,
a decisão de publicação e seus responsáveis na revisão humana do PR.

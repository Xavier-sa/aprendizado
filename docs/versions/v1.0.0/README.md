# WX Academy 1.0.0 — cronograma original

## Identificação

- Data do commit de referência: **10/09/2026**.
- Commit: `f1eb9e0df16487e306f039bfc8fb0d1d482b60f1` (`fix: corrigindo geral`).
- Tag semântica local: `v1.0.0`.
- Objetivo: organizar a rotina semanal de estudos em cartões e quizzes.

Não havia tags no repositório antes desta formalização. A versão foi classificada retroativamente sem modificar o commit.

## Tecnologias e funcionalidades

HTML, CSS e JavaScript puro. A página apresenta sete dias, disciplinas, tarefas, botões de quiz, cores por tema e rodapé. Também referencia o simulado GitHub Foundations.

## Estado publicado recuperado

O endereço `https://cronogramasemanal.wasxtech.com.br/` respondeu `200`, sem redirecionamento, com o título “Cronograma de Estudos - Wellington Xavier”. Em 390, 768, 1366 e 1920 px não foi detectado overflow horizontal. A disposição observada contém um cartão por linha no celular, múltiplas colunas no desktop e rodapé escuro.

As imagens são **referências recuperadas em 16/11/2026**, não capturas realizadas em 10/09/2026. A semelhança com o commit e com as imagens fornecidas sustenta seu uso comparativo, mas não comprova o estado histórico exato.

## Evidências

- [Mobile 390×844](screenshots/mobile.png)
- [Tablet 768×1024](screenshots/tablet.png)
- [Desktop 1366×768](screenshots/desktop.png)
- [Desktop grande 1920×1080](screenshots/desktop-large.png)
- [Inspeção automatizada](inspection.json)

## Problemas conhecidos e testes

- Console registrou um `404` genérico no primeiro contexto mobile, sem URL identificável; não houve `requestfailed` nem recurso visual ausente.
- Não havia testes automatizados no commit.
- A captura Playwright verificou status, título, URL, largura e aparência nas quatro resoluções.

## Diferença para a V2

A V1 é um cronograma pessoal centrado em cartões. A V2 transforma a entrada em plataforma educacional, adicionando trilhas, aula, progresso, glossário, navegação e qualidade automatizada, preservando os laboratórios.

## Próximo passo histórico

Evoluir para a base WX Academy 2.0.0 sem remover as rotas educacionais existentes.

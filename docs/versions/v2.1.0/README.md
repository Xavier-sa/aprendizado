# WX Academy 2.1.0 — candidata: glossário visual

Status: **candidata não lançada**. A versão oficial permanece 2.0.1; não foram criadas tag, release ou publicação.

## Objetivo

Evoluir o glossário com explicações visuais leves e acessíveis, preservando os cartões, a pesquisa, os temas e a identidade da WX Academy.

## Escopo implementado

- Registro independente de visualizações em `app/content/glossary-visuals.js`.
- Componente genérico de popover em `app/assets/js/glossary-popover.js`.
- SVGs autorais detalhados para API, JSON, JWT e CORS.
- Cenas SVG pedagógicas geradas pelo mesmo componente para os outros 46 termos, sempre vinculadas ao exemplo prático.
- Abertura por hover com atraso, toque, clique e foco.
- Fechamento por Escape, botão ou clique externo.
- Posicionamento limitado à tela, alternativa lateral no desktop e painel inferior no celular.
- Respeito a movimento reduzido e suporte aos modos claro e escuro.
- Todos os 50 termos possuem explicação visual; o texto original do cartão permanece preservado.

## Evidências

- [Glossário antes](glossario-antes.png)
- [Glossário depois](glossario-depois.png)
- [Diagrama gerado para DNS](glossario-diagrama-dns.png)
- `npm run check`: aprovado.
- `npm test`: aprovado.
- `npm run test:e2e`: 21 testes aprovados em 19/11/2026.
- Playwright validou 320, 375, 390, 768, 1024, 1366 e 1920 px, além das interações específicas do popover.

## Classificação sugerida

A mudança é compatível e adiciona funcionalidade, portanto corresponde a **MINOR** caso seja oficialmente lançada como 2.1.0.

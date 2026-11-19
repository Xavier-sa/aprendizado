# Arquitetura

## Decisão

A WX Academy permanece uma aplicação estática modular em HTML, CSS e JavaScript ES Modules. Essa escolha preserva o protótipo, permite deploy em qualquer servidor estático e mantém o custo cognitivo adequado a um projeto educacional inicial.

## Camadas

- `index.html`: estrutura semântica e pontos de montagem.
- `app/assets/css/`: sistema visual, componentes e breakpoints.
- `app/assets/js/`: interação, componentes, renderização e persistência local.
- `app/assets/illustrations/glossary/`: diagramas SVG autorais usados como apoio pedagógico.
- `app/content/`: catálogo, conteúdo educacional e registros extensíveis de recursos visuais.
- `arquivos/`: laboratórios legados preservados.
- `tests/`: validações executáveis sem navegador.
- `agents/`: responsabilidades editoriais e técnicas para o Codex.

## Estado local

O progresso utiliza a chave versionada `wx-academy-progress-v1` no `localStorage`. O objeto armazena conclusão da aula, quantidade de tentativas, status semanal e preferência de tema. Não guarda dados sensíveis. Mudanças incompatíveis devem usar uma nova versão de chave e migração explícita.

## Segurança

Conteúdo da nova interface é criado preferencialmente com `textContent`. HTML de aula embutido é estático e controlado no repositório. Dados externos não podem entrar em `innerHTML` sem sanitização. O playground legado com `eval()` é uma dívida conhecida e não deve receber dados privilegiados.

## Evolução

Novas aulas devem seguir o modelo documentado em `docs/CONTEUDOS.md`. Backend, autenticação e banco serão avaliados somente com requisitos multiusuário. React ou Next.js exigem ADR com motivação, custo de migração e plano de compatibilidade.

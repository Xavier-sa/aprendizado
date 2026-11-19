# Histórico de alterações

Este projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/). As versões abaixo foram formalizadas após inspeção do histórico Git; nenhum commit antigo foi alterado.

## [Unreleased]

### Adicionado

- Glossário visual interativo para API, JSON, JWT e CORS, usando SVGs autorais locais.
- Popover acessível por hover, toque e teclado, com fechamento por Escape, botão e clique externo.
- Registro extensível que permite adicionar diagramas sem alterar a lógica do componente.
- Testes Playwright do glossário visual em temas claro e escuro e larguras de 320 a 1920 px.
- Recomendação diária integrada ao cronograma, com tema, tarefa e atalho para o cartão atual.
- Lembrete flutuante de alto contraste exibido ao abrir a página, com ações para acessar o plano ou fechar o aviso.
- Destaque visual e semântico do dia vigente nos sete dias da semana.
- Seção de base sólida sobre dados, decisões, repetições, funções e testes.
- Seção sofisticada sobre abstração, estado, complexidade, concorrência, coesão e acoplamento, com pré-requisitos explícitos.
- Treze conceitos ao glossário, totalizando 50 termos.

### Corrigido

- Adicionada versão à URL do CSS principal para invalidar cópias antigas mantidas por navegador ou CDN após uma publicação.
- Adicionada versão às URLs do JavaScript principal e do conteúdo para impedir a combinação de HTML novo com módulos antigos em cache.
- Configurada a hospedagem Apache para entregar arquivos `.js` como `application/javascript`, permitindo a execução dos módulos ES.

### Validação

- Incluída verificação estrutural da URL versionada da folha de estilos.
- Comparados em bytes HTML, CSS e módulos locais com os arquivos entregues pela hospedagem.
- Confirmada em navegador a renderização local de 7 trilhas, 5 seções de aula, 7 dias e 37 termos, sem erros de console.

### Planejado

- Próxima evolução funcional compatível, sugerida como `2.1.0`.

## [2.0.1] - 2026-11-17

### Corrigido

- Adicionado favicon SVG padrão com a identidade visual WX.
- Configurado o servidor local para responder SVG com o tipo de conteúdo correto.

### Validação

- Link do favicon validado estruturalmente e por requisição HTTP automatizada.

## [2.0.0] - 2026-11-16

### Adicionado

- Sete trilhas educacionais e primeira aula de lógica.
- Glossário pesquisável com 37 termos.
- Quiz de cinco questões.
- Cronograma e acompanhamento de progresso no navegador.
- Modo escuro, documentação, CI e instruções de agentes.

### Melhorado

- Interface responsiva e identidade visual WX.
- Navegação mobile, semântica e acessibilidade por teclado.

### Preservado

- Laboratórios de JavaScript, SQL e GitHub Foundations.

### Validação

- Commit de implementação: `7863defb490be4f42275e6cb839988b285f54744`.
- Sintaxe e testes estruturais aprovados.
- Nove testes Playwright aprovados em 16/11/2026.
- Capturas verificadas em 390×844, 768×1024, 1366×768 e 1920×1080.

## [1.0.0] - 2026-09-10

### Funcionalidades

- Cronograma semanal original com sete cartões de estudos.
- Cores distintas por dia, botões e quizzes existentes.
- Link para o simulado GitHub Foundations e rodapé informativo.

### Referência

- Último commit anterior à WX Academy: `f1eb9e0df16487e306f039bfc8fb0d1d482b60f1`.
- O site público atual foi capturado em 16/11/2026 como referência recuperada; não prova visualmente o estado exato do dia do commit.

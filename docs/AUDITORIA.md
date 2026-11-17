# Auditoria técnica — WX Academy

Data: 16 de novembro de 2026  
Escopo: branch `cronograma`, antes da evolução para WX Academy.

## Estado encontrado

O projeto era uma aplicação estática em HTML, CSS e JavaScript puro, sem gerenciador de dependências, build, testes ou CI. A página principal montava sete cartões semanais e quizzes pelo DOM. Havia três experiências educacionais independentes: tutorial JavaScript, laboratório SQL e simulado GitHub Foundations, além de um quiz MVC. Não havia backend, autenticação ou banco de dados.

Arquivos relevantes encontrados:

- `index.html`, `app/assets/css/style.css` e `app/assets/js/main.js`: cronograma principal.
- `arquivos/JAVASCRIPT.html`: tutorial e playground JavaScript.
- `arquivos/SQL.html`: conteúdo e simulador SQL.
- `arquivos/github-foundations.html`: simulado GH-900 com 38 questões.
- `arquivos/MVC/`: quiz separado com dados duplicados entre `main.js` e `perguntas.js`.
- `peso/index.html`: arquivo vazio; `peso/peso.md`: conteúdo de saúde sem relação com a plataforma.

## Funcionalidades preservadas

- Conceito visual de cartões semanais, cores por disciplina, sombras e bordas arredondadas.
- Conteúdo e rotas dos três laboratórios principais.
- Quizzes com explicação, navegação e feedback.
- Simulado GitHub por domínio, modo prova e revisão de erros.
- Funcionamento em hospedagem estática, sem exigir framework ou servidor de aplicação.

## Problemas encontrados

### Estrutura e manutenção

- Página inicial misturava dados educacionais, criação de interface e comportamento em um arquivo de 559 linhas.
- Conteúdo, estilos e scripts extensos estavam embutidos nos HTMLs legados.
- Nomenclatura inconsistente (`JAVASCRIPT.html`, `SQL.html`, `qui-original.js`).
- README citava `CONTRIBUTING.md`, mas o arquivo não existia.
- `peso/index.html` estava vazio e a pasta `peso/` não pertence ao domínio educacional proposto.
- Não havia catálogo de trilhas, padrão de aula, documentação arquitetural nem roadmap.

### Acessibilidade e semântica

- A página principal não possuía `main`, navegação, link de salto ou regiões semânticas adequadas.
- O alerta automático no carregamento interrompia a experiência.
- Controles do quiz não comunicavam todo o estado para tecnologias assistivas.
- Alguns botões e alternativas legadas usam eventos inline e elementos `div` clicáveis.
- Foco visível, redução de movimento e modo escuro não eram tratados de forma consistente.

### Responsividade

- O cronograma principal possuía apenas um breakpoint e nenhuma navegação mobile.
- Blocos de código e tabelas legadas podem ultrapassar telas estreitas.
- Não existia matriz automatizada de viewports ou teste de rolagem horizontal.

### Segurança

- O playground JavaScript legado usa `eval()` no contexto da página. Código digitado pode acessar o DOM e armazenamento da mesma origem. Deve ser substituído futuramente por sandbox isolado.
- Há geração de HTML com `innerHTML`. No cronograma antigo os dados eram locais, mas o padrão não deve receber conteúdo externo sem sanitização.
- Não havia cabeçalhos definidos no servidor local ou política documentada para segredos.
- Nenhum segredo foi encontrado nos arquivos rastreados durante esta auditoria.

### Qualidade, Git e entrega

- Nenhum teste automatizado, manifesto de projeto ou workflow de CI.
- Não havia `.editorconfig` ou `.gitignore` específico da plataforma.
- Deploy e validação não estavam separados formalmente.

## Melhorias aplicadas na primeira entrega

- Nova página principal sem framework, preservando compatibilidade com hospedagem estática.
- Catálogo inicial com sete níveis e primeira aula completa de fundamentos.
- Quiz de cinco questões, cronograma com status e progresso em `localStorage`.
- Glossário pesquisável com os termos mínimos solicitados.
- Navegação responsiva, foco visível, link de salto, tema escuro e suporte a movimento reduzido.
- Dados educacionais separados em `app/content/fundamentos.js`.
- Testes estruturais com Node, matriz responsiva com Playwright, servidor local com cabeçalhos básicos e CI sem deploy.
- Documentação e instruções para agentes especializados.

## Riscos e decisões

| Risco | Decisão atual | Próxima mitigação |
|---|---|---|
| Quebrar laboratórios existentes | Manter caminhos e código legado | Cobrir fluxos com Playwright antes de refatorar |
| `eval()` no playground | Isolar e sinalizar como legado | Executar em iframe sandbox ou worker dedicado |
| Dados locais perdidos ao limpar navegador | Aceito para versão pessoal | Exportação/importação JSON antes de backend |
| Conteúdo crescer dentro de JS | Módulo de conteúdo inicial | Migrar gradualmente para JSON/Markdown validado |
| Arquivos sem relação (`peso/`) | Não removidos por segurança | Confirmar com o proprietário antes da exclusão |

## Plano de migração

1. Estabilizar a página principal e criar testes de navegador.
2. Extrair os laboratórios legados um por vez, mantendo URLs de compatibilidade.
3. Padronizar o modelo de aulas e validar conteúdo automaticamente.
4. Implementar exportação/importação do progresso local.
5. Avaliar backend apenas quando existir necessidade multiusuário comprovada.

Next.js não é recomendado nesta fase: a aplicação não precisa de renderização no servidor, autenticação ou rotas dinâmicas. A migração adicionaria dependências, build e custo operacional sem resolver um problema atual.

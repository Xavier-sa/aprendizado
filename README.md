# WX Academy — Do Zero ao Desenvolvedor

Plataforma educacional estática para aprender programação de forma progressiva, com aulas curtas, prática, quizzes, glossário e acompanhamento local.

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm start
```

Abra `http://localhost:4173`. Não é necessário instalar dependências para executar ou testar.

## Verificações

```bash
npm run check
npm test
npm run test:e2e
```

## Estrutura

```text
app/
  assets/             # CSS e comportamento da plataforma
  content/            # conteúdo educacional estruturado
arquivos/             # laboratórios legados preservados
agents/               # instruções dos agentes Codex
docs/                 # auditoria, arquitetura e evolução
scripts/              # servidor local
tests/                # validações automatizadas
index.html             # entrada da WX Academy
```

## Funcionalidades atuais

- Sete trilhas planejadas e primeira aula de fundamentos.
- Quiz de cinco questões com correção comentada.
- Cronograma semanal e progresso persistidos em `localStorage`.
- Glossário pesquisável com 37 termos.
- Tema claro/escuro, menu mobile e navegação por teclado.
- Laboratórios de JavaScript, SQL e GitHub Foundations preservados.

## Limitações conhecidas

O playground JavaScript legado usa `eval()` e deve ser usado somente com código de estudo confiável. A persistência é local e pode ser perdida ao limpar os dados do navegador. Ainda não há testes visuais com Playwright nem backend multiusuário.

Leia [a auditoria](docs/AUDITORIA.md), [a arquitetura](docs/ARQUITETURA.md) e [o roadmap](docs/ROADMAP.md) antes de mudanças estruturais.

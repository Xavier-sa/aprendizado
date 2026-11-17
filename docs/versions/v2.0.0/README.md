# WX Academy 2.0.0 — primeira base educacional

## Identificação

- Data confirmada: **16/11/2026**.
- Commit de implementação: `7863defb490be4f42275e6cb839988b285f54744`.
- Tag semântica local: `v2.0.0`.
- Objetivo: transformar o cronograma em uma base educacional progressiva e responsiva.

## Tecnologias e funcionalidades

HTML semântico, CSS responsivo, JavaScript ES Modules, `localStorage`, Node.js para validações e Playwright. Inclui sete trilhas, primeira aula de lógica, quiz, cronograma com status, progresso, glossário com 37 termos, menu mobile, modo escuro e links para laboratórios preservados.

## Melhorias

- Identidade WX minimalista com verde-lima.
- Conteúdo educacional separado da camada de interação.
- Navegação por teclado, link de salto, foco visível e movimento reduzido.
- Testes estruturais, matriz responsiva e CI sem deploy.

## Evidências

- [Mobile 390×844](screenshots/mobile.png)
- [Tablet 768×1024](screenshots/tablet.png)
- [Desktop 1366×768](screenshots/desktop.png)
- [Desktop grande 1920×1080](screenshots/desktop-large.png)
- [Inspeção automatizada](inspection.json)

## Testes realizados

- `npm run check`: sintaxe aprovada.
- `npm test`: 7 trilhas, 5 questões e 37 termos validados.
- `npm run test:e2e`: 9 testes aprovados.
- Playwright verificou sete larguras, ausência de overflow, menu, pesquisa, cronograma, progresso, quiz e persistência do modo escuro.

## Problemas conhecidos

- O playground JavaScript legado ainda usa `eval()`.
- O estado fica apenas no navegador e pode ser perdido ao limpar dados.
- O primeiro contexto mobile registrou um `404` genérico sem URL identificável; não houve falha de requisição nem quebra visual observada.

## Diferenças em relação à V1

| Área | V1.0.0 | V2.0.0 |
|---|---|---|
| Propósito | Cronograma pessoal | Plataforma educacional inicial |
| Navegação | Página única sem menu | Menu responsivo e seções |
| Conteúdo | Tarefas semanais | Trilhas, aula, prática e glossário |
| Progresso | Não persistido | `localStorage` |
| Aparência | Cartões por dia | Identidade WX clara/escura |
| Qualidade | Sem testes | Node, Playwright e CI |
| Legado | Laboratórios existentes | Laboratórios preservados |

## Próximos passos

A próxima evolução funcional compatível deve ser avaliada como `2.1.0`, com aulas adicionais e melhorias dos laboratórios. Não criar versão apenas por documentação ou correção editorial isolada.

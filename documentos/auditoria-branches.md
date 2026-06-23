# Auditoria e reaproveitamento de branches

Este documento registra a analise das branches remotas e o que foi reaproveitado no repositorio atual.

A estrategia usada foi conservadora: em vez de mesclar tudo diretamente, cada branch foi comparada com `origin/develop` e os conteudos uteis foram copiados para a estrutura nova em portugues BR. Isso preserva a evolucao do junior, mas evita trazer bagunca antiga, conflitos silenciosos, dependencias pesadas ou arquivos sensiveis.

## Resumo executivo

| Item | Resultado |
| --- | --- |
| Branches remotas encontradas | 27 |
| Branch principal usada como referencia | `origin/develop` |
| Branches com conteudo reaproveitado nesta etapa | 14 |
| Conflitos textuais detectados por simulacao | 0 |
| Risco real observado | Medio, por mudanca estrutural grande entre branches antigas e a organizacao atual |
| Stack predominante do repositorio | HTML, CSS, JavaScript, PHP, Python, Java e SQL |
| Stack nao encontrada como base principal | Next.js, Prisma ORM e TypeScript de aplicacao |

## Matriz de branches

| Branch | Objetivo identificado | Arquivos alterados ou analisados | Risco | Pode mesclar? |
| --- | --- | --- | --- | --- |
| `origin/develop` | Linha principal de comparacao | Base historica | Baixo | Manter |
| `origin/main` | Linha principal remota | Base historica | Baixo | Manter |
| `origin/projeto-7` | Organizacao atual do repositorio | Estrutura em portugues BR, docs e README | Baixo | Manter |
| `origin/feature/interacao` | Menu/interacao web simples | HTML, CSS e JS | Baixo | Reaproveitado sem merge |
| `origin/rota` | Demonstracao de rotacao/interacao | HTML e JS | Baixo | Reaproveitado sem merge |
| `origin/conhecimentos/uteis` | Pagina de conhecimentos uteis | HTML, CSS e JSON | Baixo | Reaproveitado sem merge |
| `origin/cronograma` | Cronograma de estudos | HTML, assets e anotacoes | Baixo | Reaproveitado sem merge |
| `origin/Semanal/Quarta-feira-BANCO` | Estudos semanais de banco | HTML | Baixo | Reaproveitado sem merge |
| `origin/Semanal/Quinta-feira-JAVASCRIPT` | Estudos semanais de JavaScript | MVC simples em JS | Baixo | Reaproveitado sem merge |
| `origin/domingo/financeiro` | Projeto financeiro | PHP, SQL e estrutura de app | Medio | Reaproveitado sem merge |
| `origin/nomeclatura-TI` | Projeto de nomenclatura tecnica | Python e README | Baixo | Reaproveitado sem merge |
| `origin/paginacao/php` | Exemplo de paginacao em PHP | PHP, CSS e SQL | Medio | Reaproveitado sem merge |
| `origin/feature/JAVA` | Exercicios Java/POO | Java e Markdown | Medio | Reaproveitado sem merge |
| `origin/python/alura` | Estudos Python/Alura | Python, CSV, Markdown e demo HTML | Medio | Reaproveitado parcialmente |
| `origin/dio/node` | Estudos Node e Python | JS, package, Python e imagens | Alto | Reaproveitado parcialmente |
| `origin/estacio/pos` | Materiais de pos-graduacao | Front-end, Python, imagens e PDF | Alto | Reaproveitado parcialmente |
| `origin/trilha/registrando` | Trilha base de melhoria | Markdown por tema | Baixo | Reaproveitado sem merge |
| `origin/nova-branch-vazia` | Branch sem base comum com `develop` | Docs e HTML simples | Alto | Reaproveitado parcialmente |
| `origin/ControleGastos-Versao008` | Conteudo ja incorporado ou sem diferenca relevante | Nenhum reaproveitamento novo | Baixo | Arquivar |
| `origin/Perfil/Fundo` | Conteudo ja incorporado ou sem diferenca relevante | Nenhum reaproveitamento novo | Baixo | Arquivar |
| `origin/Projecao/PYTHON-01` | Conteudo ja incorporado ou sem diferenca relevante | Nenhum reaproveitamento novo | Baixo | Arquivar |
| `origin/chore/reorganizar-estrutura` | Tentativa antiga de organizacao | Sobreposta pela organizacao atual | Baixo | Arquivar |
| `origin/cmd/aprendizado` | Estudos de terminal | Sobreposto por estudos atuais | Baixo | Arquivar |
| `origin/correcao-python` | Correcoes antigas em Python | Sem reaproveitamento novo nesta etapa | Medio | Revisar depois |
| `origin/dio-readme` | Documentacao DIO antiga | Sobreposta por README atual | Baixo | Arquivar |
| `origin/editar/PHP-` | Estudos PHP antigos | Sem reaproveitamento novo nesta etapa | Medio | Revisar depois |
| `origin/feature/montarAmbiente-01` | Preparacao de ambiente | Sobreposta por estudos atuais | Baixo | Arquivar |

## Conteudos reaproveitados

| Origem | Destino atual | Motivo |
| --- | --- | --- |
| `origin/feature/interacao` | `demonstracoes/menu-interativo/` | Demonstra interacao basica com HTML, CSS e JavaScript. |
| `origin/rota` | `demonstracoes/rotacionar/` | Preserva experimento visual simples. |
| `origin/conhecimentos/uteis` | `demonstracoes/conhecimentos-uteis/` | Mantem pagina consultiva com dados estruturados. |
| `origin/cronograma` | `estudos/reaproveitamento-branches/cronograma/` | Registra planejamento de estudos. |
| `origin/Semanal/Quarta-feira-BANCO` | `estudos/reaproveitamento-branches/quarta-banco/` | Preserva pratica semanal de banco. |
| `origin/Semanal/Quinta-feira-JAVASCRIPT` | `estudos/reaproveitamento-branches/quinta-javascript/` | Preserva estudo MVC em JavaScript. |
| `origin/domingo/financeiro` | `projetos/rota-da-riqueza/` | Reaproveita projeto financeiro com PHP e SQL. |
| `origin/nomeclatura-TI` | `projetos/nomenclatura-ti/` | Mantem projeto pequeno em Python para termos tecnicos. |
| `origin/paginacao/php` | `projetos/paginacao-php/` e `estudos/linguagens/PHP/enum/` | Separa projeto de paginacao e estudo de enum. |
| `origin/feature/JAVA` | `estudos/estacio/java/` | Mantem exercicios academicos de Java e POO. |
| `origin/python/alura` | `estudos/alura-python/` e `demonstracoes/gastos-alura/` | Reaproveita aulas, CSVs e demonstracao sem trazer arquivo de senhas. |
| `origin/dio/node` | `estudos/reaproveitamento-branches/dio-node/` | Reaproveita exemplos Node/Python sem `node_modules`. |
| `origin/estacio/pos` | `estudos/estacio/pos-graduacao/` | Organiza materiais por `frontend`, `python` e `referencias`. |
| `origin/trilha/registrando` | `estudos/trilha-melhoria-base/` | Preserva trilha de logica, POO, banco, web e padroes de README. |
| `origin/nova-branch-vazia` | `estudos/reaproveitamento-branches/nova-branch-vazia/` | Mantem apenas docs e demos; ignora configuracao local de editor. |

## Itens evitados de proposito

- `node_modules`, por ser dependencia gerada e pesada.
- `.vscode/settings.json` da branch sem base, por ser configuracao local.
- `ALURA/senhas.md`, por indicar possivel arquivo sensivel.
- Merge direto das branches antigas, porque a estrutura atual mudou bastante.

## Ordem ideal para proximos merges

1. Branches ja reaproveitadas e pequenas: `feature/interacao`, `rota`, `conhecimentos/uteis`.
2. Branches de estudo sem banco: `Semanal/Quinta-feira-JAVASCRIPT`, `feature/JAVA`, `trilha/registrando`.
3. Branches com banco ou PHP: `Semanal/Quarta-feira-BANCO`, `paginacao/php`, `domingo/financeiro`.
4. Branches grandes ou com materiais mistos: `python/alura`, `dio/node`, `estacio/pos`.
5. Branch sem base comum: `nova-branch-vazia`, sempre com revisao manual.

## Branches criticas

- `origin/dio/node`: possui estrutura grande, dependencias Node e materiais mistos.
- `origin/estacio/pos`: mistura front-end, Python, imagens, PDF e arquivos academicos.
- `origin/nova-branch-vazia`: nao possui merge-base com `origin/develop`.
- `origin/paginacao/php`: envolve PHP, SQL e nomes antigos.
- `origin/domingo/financeiro`: possui projeto financeiro com banco e aplicacao.

## Plano de padronizacao

### Fase 1 - Estrutura

Manter o padrao atual:

```text
recursos/
demonstracoes/
documentos/
projetos/
laboratorios/
estudos/
```

Para projetos futuros em React, Next.js ou Node, usar `src/` apenas dentro do projeto especifico, nao na raiz geral do repositorio de estudos.

### Fase 2 - Tipos e contratos

Quando houver TypeScript, centralizar tipos em `src/types/` dentro do projeto correspondente.

### Fase 3 - API

Para projetos com API, padronizar:

- tratamento com `try/catch`;
- resposta de erro consistente;
- logs simples;
- validacao de entrada antes da regra de negocio.

### Fase 4 - Banco

Para SQL, revisar:

- nomes de tabelas;
- chaves primarias;
- relacionamentos;
- indices;
- campos `createdAt`, `updatedAt` e `deletedAt` quando fizer sentido.

### Fase 5 - UI

Criar componentes repetiveis quando houver aplicacao maior:

- botao primario, secundario e perigo;
- formulario padrao;
- tabela padrao;
- modal de confirmacao;
- badge de sucesso, alerta e erro.

### Fase 6 - Testes

Comecar simples:

- teste manual documentado no README do projeto;
- depois teste automatizado para regras de negocio;
- por fim testes de interface quando o projeto justificar.

## Comandos Git sugeridos

```bash
git fetch --all --prune
git checkout projeto-7
git status
git checkout -b padronizacao/reaproveitamento-branches
```

Para comparar uma branch antes de reaproveitar:

```bash
git diff --stat origin/develop..origin/NOME-DA-BRANCH
git diff --name-status origin/develop..origin/NOME-DA-BRANCH
```

Para testar conflitos sem alterar a branch atual:

```bash
git merge-tree $(git merge-base origin/develop origin/NOME-DA-BRANCH) origin/develop origin/NOME-DA-BRANCH
```

Para reaproveitar arquivos especificos sem merge:

```bash
git archive --prefix=destino/ origin/NOME-DA-BRANCH caminho/do/arquivo | tar -x
```

## Decisao final desta etapa

O melhor caminho nao e mesclar as 27 branches agora. O melhor caminho e manter a organizacao atual como base, reaproveitar conteudos essenciais em commits pequenos e depois arquivar branches antigas que ja foram absorvidas.

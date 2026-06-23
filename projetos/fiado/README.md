# FIADO — Evolução do Projeto

Este projeto é uma linha do tempo de aprendizagem e evolução técnica. Ele documenta como um desenvolvedor júnior avançou de uma solução local em Python para uma versão funcional em PHP, mantendo o mesmo domínio de negócio: controle de fiado, clientes e pagamentos.

## Objetivo
- Demonstrar a evolução técnica e arquitetural
- Tornar o código acessível para avaliadores seniores
- Padronizar nomes e pastas para facilitar navegação
- Apresentar claramente o que foi aprendido em cada etapa

## Estrutura do projeto
- `01-php-legacy/` — Primeira versão PHP antiga, com lógica básica de cadastro e controle de compras.
- `02-python/` — Versão inicial em Python + Flask, arquitetura MVC e dados locais.
- `03-php-web/` — Versão web atual em PHP, interface mais completa e layout responsivo.

## Como analisar
1. Comece por `README.md` na raiz para entender o propósito geral.
2. Abra cada pasta em sequência numérica para ver a evolução do código.
3. Compare `01-php-legacy` com `03-php-web` para perceber melhorias de UX, filtros e organização do sistema.
4. Veja `02-python` para entender a abordagem MVC e o uso de templates.

## Padrões aplicados
- Nomes de pasta padronizados em lowercase com prefixo numérico: `01-`, `02-`, `03-`
- Arquivos de banco padronizados como `schema.sql` e `seed.sql`
- Documentação de versão adicionada em cada pasta
- Interface de projeto centralizada em `README.md`

## Nota para avaliadores
Este repositório agora é uma biografia técnica: cada pasta representa um capítulo do aprendizado. Acredito que essa organização ajuda qualquer líder técnico a compreender claramente a evolução do raciocínio, escolha de tecnologias e melhorias incrementais.

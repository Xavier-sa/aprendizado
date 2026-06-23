# 02-python

Primeira versão local em Python, usando Flask e MySQL.

## O que contém
- `app.py` — aplicação Flask principal
- `config.py` — configurações do banco e app
- `database.py` — conexão e execução SQL
- `models/` — modelos para clientes e compras
- `templates/` — views HTML
- `schema.sql` — estrutura do banco
- `seed.sql`, `seed-2.sql`, `seed-3.sql` — dados de amostra

## Características
- MVC simples com separação de modelo, view e controlador
- Mensagens flash e redirecionamento para evitar reenvio de formulários
- Agregação de compras e totais do sistema

## Observações
Esta versão mostra a evolução do projeto técnica com boas práticas de arquitetura em Python.

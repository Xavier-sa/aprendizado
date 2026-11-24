# Arquitetura

## Visão geral

O Calendário Invest usa uma arquitetura web pequena com três partes:

1. O Flask entrega a página e expõe a API HTTP.
2. O JavaScript consome a API e atualiza a interface.
3. O PostgreSQL Neon persiste os dados em produção; `depositos.json` é o
   fallback para desenvolvimento local e testes.

## Fluxo principal

1. A página pública em `/` apresenta o tutorial e aponta para `/entrar`. O painel autenticado fica em `/painel`.
2. O Flask exige uma sessão autenticada e identifica o usuário.
3. O Flask carrega somente os dados desse usuário e renderiza `templates/index.html`.
4. O frontend solicita `GET /api/dados`.
5. A API calcula o resumo e devolve JSON.
6. O frontend monta a tabela e apresenta o progresso.
7. Alterações de meta, banco ou depósito passam pela API antes da gravação.

## Cálculo da tabela

A quantidade é o menor inteiro `n` cuja soma sequencial alcança a meta:

```text
1 + 2 + ... + n = n × (n + 1) / 2
```

O backend calcula:

```text
n = teto((raiz(1 + 8 × meta) - 1) / 2)
```

O arredondamento para cima garante que a soma sugerida nunca fique abaixo do
objetivo.

## API

| Método | Rota | Finalidade |
| --- | --- | --- |
| `GET/POST` | `/entrar` | Autentica uma conta. |
| `GET/POST` | `/cadastro` | Cria uma conta. |
| `POST` | `/sair` | Encerra a sessão. |
| `GET` | `/admin/usuarios` | Lista contas para administradores. |
| `POST` | `/admin/usuarios/<id>/editar` | Edita uma conta. |
| `POST` | `/admin/usuarios/<id>/alternar` | Ativa ou desativa uma conta. |
| `POST` | `/admin/usuarios/<id>/excluir` | Exclui uma conta e seus dados. |
| `GET` | `/` | Renderiza a interface. |
| `GET` | `/api/dados` | Retorna metas, bancos e a meta ativa. |
| `POST` | `/api/metas` | Cria e seleciona uma meta. |
| `PUT` | `/api/metas/<meta_id>` | Atualiza uma meta. |
| `DELETE` | `/api/metas/<meta_id>` | Remove uma meta, exceto a última. |
| `POST` | `/api/metas/<meta_id>/selecionar` | Seleciona a meta ativa. |
| `POST` | `/api/bancos` | Cadastra um banco. |
| `PUT` | `/api/bancos/<banco_id>` | Renomeia um banco. |
| `DELETE` | `/api/bancos/<banco_id>` | Remove um banco que não esteja em uso. |
| `POST` | `/api/metas/<meta_id>/depositos/<numero>` | Cria ou atualiza um depósito. |
| `DELETE` | `/api/metas/<meta_id>/depositos/<numero>` | Remove um depósito. |

`GET /api/depositos` continua disponível para leitura da meta ativa por
compatibilidade com a primeira versão.

## Persistência

O arquivo JSON tem a seguinte estrutura:

```json
{
  "versao": 2,
  "meta_ativa_id": "meta_123",
  "metas": [
    {
      "id": "meta_123",
      "nome": "Reserva",
      "valor": 23450.0,
      "depositos": {}
    }
  ],
  "bancos": [
    {
      "id": "banco_123",
      "nome": "Meu banco"
    }
  ]
}
```

Ao ler o formato da primeira versão, o backend cria `Meta 1`, converte os
nomes de bancos encontrados em cadastros e associa os depósitos aos novos
identificadores. A migração só é gravada junto com a próxima alteração do
usuário.

No modo local, o aplicativo escreve primeiro em um arquivo temporário no mesmo
diretório e depois usa substituição atômica. Em produção, cada atualização é
gravada transacionalmente no documento JSONB mantido pelo Neon.

### Execução na Vercel

Na Vercel, o aplicativo usa PostgreSQL Neon quando `DATABASE_URL` está
definida. Contas ficam em `usuarios` e cada estado JSONB fica em
`calendario_estado_usuario`, ligado ao proprietário por chave estrangeira.
As tabelas são criadas automaticamente. O arquivo JSON permanece como
fallback para desenvolvimento local e testes.

## Limites atuais

- Não existe recuperação de senha por e-mail.
- Não existe sincronização com instituições bancárias.
- O servidor embutido do Flask serve somente para desenvolvimento.


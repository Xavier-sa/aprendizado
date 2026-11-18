# Arquitetura

## Visão geral

O Calendário Invest usa uma arquitetura web pequena com três partes:

1. O Flask entrega a página e expõe a API HTTP.
2. O JavaScript consome a API e atualiza a interface.
3. O arquivo `depositos.json` persiste a meta e os registros.

## Fluxo principal

1. O navegador solicita `/`.
2. O Flask carrega os dados e renderiza `templates/index.html`.
3. O frontend solicita `GET /api/depositos`.
4. A API calcula o resumo e devolve JSON.
5. O frontend monta a tabela e apresenta o progresso.
6. Alterações de meta ou depósito passam pela API antes da gravação.

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
| `GET` | `/` | Renderiza a interface. |
| `GET` | `/api/depositos` | Retorna meta, progresso e registros. |
| `POST` | `/api/meta` | Valida e atualiza a meta. |
| `POST` | `/api/depositos/<numero>` | Cria ou atualiza um depósito. |
| `DELETE` | `/api/depositos/<numero>` | Remove um depósito. |

## Persistência

O arquivo JSON tem a seguinte estrutura:

```json
{
  "meta": 23450.0,
  "depositos": {}
}
```

O aplicativo escreve primeiro em um arquivo temporário no mesmo diretório e
depois usa substituição atômica. Esse fluxo reduz o risco de deixar um JSON
parcial quando uma gravação falha.

## Limites atuais

- Os dados pertencem a uma única instalação local.
- Não existe autenticação.
- Não existe banco de dados nem sincronização remota.
- O servidor embutido do Flask serve somente para desenvolvimento.


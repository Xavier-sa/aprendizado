# Arquitetura

## Visão geral

O Calendário Invest usa uma arquitetura web pequena com três partes:

1. O Flask entrega a página e expõe a API HTTP.
2. O JavaScript consome a API e atualiza a interface.
3. O arquivo `depositos.json` persiste as metas, os bancos e os registros.

## Fluxo principal

1. O navegador solicita `/`.
2. O Flask carrega os dados e renderiza `templates/index.html`.
3. O frontend solicita `GET /api/dados`.
4. A API calcula o resumo e devolve JSON.
5. O frontend monta a tabela e apresenta o progresso.
6. Alterações de meta, banco ou depósito passam pela API antes da gravação.

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
| `GET` | `/api/dados` | Retorna metas, bancos e a meta ativa. |
| `POST` | `/api/metas` | Cria e seleciona uma meta. |
| `PUT` | `/api/metas/<meta_id>` | Atualiza uma meta. |
| `DELETE` | `/api/metas/<meta_id>` | Remove uma meta, exceto a última. |
| `POST` | `/api/metas/<meta_id>/selecionar` | Seleciona a meta ativa. |
| `POST` | `/api/bancos` | Cadastra um banco. |
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

O aplicativo escreve primeiro em um arquivo temporário no mesmo diretório e
depois usa substituição atômica. Esse fluxo reduz o risco de deixar um JSON
parcial quando uma gravação falha.

### Execução na Vercel

Na Vercel, o aplicativo usa `/tmp/calendario-invest-depositos.json`, pois o
diretório da função é somente leitura. A variável `CALENDARIO_DATA_FILE`
permite apontar para outro caminho gravável. O armazenamento em `/tmp` evita
erros nas operações, mas é temporário e pode ser reiniciado pela plataforma.

## Limites atuais

- Os dados pertencem a uma única instalação local.
- Não existe autenticação.
- Não existe banco de dados nem sincronização remota.
- O servidor embutido do Flask serve somente para desenvolvimento.
- Na Vercel, os dados podem ser reiniciados em uma nova instância enquanto
  não houver um armazenamento persistente externo.


# Visão do projeto — Calendário Invest

## Para que serve

O Calendário Invest ajuda uma pessoa a transformar um objetivo financeiro em
uma sequência concreta de pequenos depósitos. A aplicação calcula a menor
quantidade de posições necessária para que a soma de `1` até `n` alcance ou
ultrapasse o valor da meta, acompanha os depósitos realizados e apresenta o
progresso restante.

O produto não movimenta dinheiro nem se conecta a contas bancárias. Ele é um
planejador e registro de depósitos feitos pelo próprio usuário.

## Atores

### Pessoa usuária

- cria, seleciona, edita e remove metas;
- cadastra os bancos usados para organizar os depósitos;
- registra, edita e remove depósitos;
- acompanha valor depositado, saldo restante e percentual concluído;
- alterna filtros e tema visual.

### Administrador técnico

- mantém o código, o deploy e o domínio;
- acompanha o CI e os logs da Vercel;
- administra o banco Neon e suas credenciais;
- executa migrações, restaurações e atualizações de segurança.

### Serviços externos

- **Vercel:** hospeda a aplicação Flask e entrega o domínio público;
- **Neon:** fornece o PostgreSQL persistente;
- **GitHub Actions:** executa testes e validações antes da integração de
  alterações.

## Casos de uso principais

1. Criar uma meta informando nome e valor.
2. Calcular automaticamente a quantidade de depósitos sequenciais.
3. Cadastrar um banco de destino.
4. Registrar um depósito em uma posição da tabela.
5. Consultar o progresso de cada meta.
6. Corrigir ou remover um depósito.
7. Alternar entre várias metas financeiras.

## Regras de negócio

- Toda meta deve ter nome e valor maior que zero.
- Deve existir pelo menos uma meta.
- A quantidade é o menor inteiro `n` em que `n × (n + 1) / 2` alcança a meta.
- Um depósito só pode usar um banco cadastrado e um método permitido.
- Um banco vinculado a um depósito não pode ser removido.
- Os depósitos de metas diferentes são independentes.
- O total depositado considera os valores efetivamente registrados.

## Arquitetura

```text
Navegador
   │ HTML, CSS, JavaScript e API JSON
   ▼
Aplicação Flask na Vercel
   │ conexão TLS via DATABASE_URL
   ▼
PostgreSQL Neon (região São Paulo)
```

O Flask continua sendo a fonte das regras de negócio. O frontend apenas envia
ações e renderiza os resumos calculados pela API.

## Persistência

Em produção, o estado é salvo na tabela `calendario_estado`:

| Coluna | Tipo | Finalidade |
| --- | --- | --- |
| `id` | `SMALLINT` | Identificador fixo do estado atual. |
| `dados` | `JSONB` | Metas, bancos, depósitos e meta ativa. |
| `atualizado_em` | `TIMESTAMPTZ` | Data da última gravação. |

O uso de JSONB preserva o formato da aplicação e permite migrar o conteúdo de
`depositos.json` sem perder registros. A tabela é criada automaticamente na
primeira execução. Sem `DATABASE_URL`, a execução local continua usando o
arquivo JSON para facilitar desenvolvimento e testes.

## Ambientes e configuração

O recurso Neon `calendario-invest-db` está conectado aos ambientes
`production`, `preview` e `development` da Vercel. A aplicação utiliza somente
`DATABASE_URL`; as demais variáveis fornecidas pela integração ficam
disponíveis para manutenção e ferramentas administrativas.

Arquivos `.env*` nunca devem ser versionados. Para atualizar variáveis locais,
use o CLI da Vercel autenticado.

## Segurança e privacidade

- Não registrar senhas bancárias, tokens, chaves Pix completas ou dados
  financeiros sensíveis no campo de detalhes.
- Credenciais do Neon devem permanecer nas variáveis protegidas da Vercel.
- O sistema ainda não possui autenticação de usuários; portanto, o endereço
  deve ser tratado como uma instalação de uso controlado.
- Antes de uso por várias pessoas, implementar autenticação e separar os dados
  por usuário.

## Operação e qualidade

O workflow `Calendario Invest CI` executa testes unitários, compilação do
Python, verificação de sintaxe JavaScript e validação do `vercel.json`.

Comandos locais:

```bash
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
python -m py_compile app.py
node --check static/app.js
```

## Limitações atuais

- Não há autenticação nem isolamento por pessoa.
- O estado completo fica em um único documento JSONB, adequado ao uso atual,
  mas não a alta concorrência.
- Não existe importação, exportação ou histórico de alterações.
- O aplicativo registra depósitos, mas não confirma transações bancárias.

## Evolução recomendada

1. Adicionar autenticação e identificação do proprietário dos dados.
2. Normalizar metas, bancos e depósitos em tabelas próprias quando houver
   múltiplos usuários ou necessidade de relatórios.
3. Criar exportação e restauração de dados.
4. Adicionar testes de navegador ao CI.
5. Configurar monitoramento e alertas de falha da API.

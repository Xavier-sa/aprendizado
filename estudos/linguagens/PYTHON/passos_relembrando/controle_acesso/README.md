# Controle diário de acesso com Flask

Este projeto registra a entrada diária de pessoas a pé ou em veículos. O
Flask cria o servidor web, entrega a interface ao navegador e recebe os dados
do formulário. Cada cadastro é persistido localmente no arquivo
`acessos.json`.

## Estrutura do projeto

```text
controle_acesso/
├── app.py                  # Servidor Python (backend)
├── requirements.txt       # Dependência do projeto
├── acessos.json            # Criado automaticamente no primeiro cadastro
└── templates/
    └── index.html          # HTML, CSS e JavaScript da interface
```

## 1. Preparar o ambiente

Abra um terminal nesta pasta. É recomendado criar um ambiente virtual para
que a dependência fique isolada dos outros projetos:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
```

No Windows, a ativação do ambiente virtual é feita com:

```powershell
.venv\Scripts\activate
```

## 2. Executar o servidor

Com o ambiente virtual ativado, execute:

```bash
python3 app.py
```

Depois, acesse <http://localhost:5000> no navegador. Preencha o formulário e
selecione **Veículo** caso queira informar uma placa.

Ao clicar em **Registrar acesso**, o navegador envia os dados à API. O arquivo
`acessos.json` será criado automaticamente na pasta do projeto.

## 3. Entendendo o backend (`app.py`)

### Importações e configuração

- `json` lê e grava dados no formato JSON.
- `datetime` captura a data e a hora de cada registro.
- `Path`, do módulo `pathlib`, localiza o arquivo de dados com segurança.
- `Flask` inicializa a aplicação web.
- `render_template` entrega o HTML guardado em `templates`.
- `request` permite ler os dados enviados pelo navegador.
- `jsonify` transforma dicionários Python em respostas JSON.
- `app = Flask(__name__)` cria a aplicação.
- `ARQUIVO_DADOS` aponta para `acessos.json` ao lado de `app.py`.

### Leitura e gravação

- `carregar_dados()` verifica se o JSON existe, abre o arquivo em UTF-8 e
  devolve sua lista de registros.
- Se o arquivo não existir, estiver inválido ou não contiver uma lista, a
  função devolve `[]` para o programa continuar funcionando.
- `salvar_dados(dados)` abre o arquivo no modo de escrita e usa `json.dump`.
- `indent=4` deixa o JSON legível e `ensure_ascii=False` preserva acentos.

### Rotas

- `@app.route("/")` associa o endereço principal à função
  `pagina_inicial()`, que renderiza `index.html`.
- `@app.route("/api/cadastrar", methods=["POST"])` cria a API de cadastro.
- `request.get_json(silent=True)` tenta interpretar o corpo da requisição sem
  derrubar o servidor se o conteúdo for inválido.
- O servidor valida nome, documento, tipo de acesso e placa. Essa validação é
  importante mesmo existindo `required` no HTML, pois uma requisição também
  pode ser enviada sem usar o formulário.
- `datetime.now().strftime(...)` adiciona data e hora no formato brasileiro.
- O registro é acrescentado à lista e salvo no JSON.
- O código HTTP `201 Created` informa que o recurso foi criado. Dados inválidos
  recebem `400 Bad Request`; falhas de gravação recebem `500`.
- O bloco `if __name__ == "__main__"` inicia o servidor apenas quando
  `app.py` é executado diretamente.

## 4. Entendendo o frontend (`templates/index.html`)

### HTML

- `<!DOCTYPE html>` declara HTML5 e `lang="pt-BR"` informa o idioma.
- As tags `meta` configuram UTF-8 e adaptação para telas pequenas.
- O `form` agrupa nome, documento, tipo de acesso e placa.
- Os atributos `for` dos rótulos correspondem aos `id` dos campos, ajudando a
  acessibilidade.
- `required` ativa a validação básica do navegador.
- O campo da placa começa com `hidden` e só é exibido para veículos.
- A região de mensagem possui `aria-live="polite"`, permitindo que leitores
  de tela anunciem o resultado do cadastro.

### CSS

- O seletor `*` padroniza o cálculo de tamanho e remove margens iniciais.
- O `body` usa Flexbox para centralizar o cartão horizontal e verticalmente.
- `.container` cria o cartão branco, responsivo, arredondado e sombreado.
- Os campos ocupam toda a largura disponível e recebem destaque no foco.
- `.sucesso` e `.erro` exibem mensagens com cores diferentes.
- O estado `button:disabled` comunica que o envio está em andamento.

### JavaScript

- `document.getElementById(...)` encontra os elementos pelos identificadores.
- O evento `change` do seletor mostra ou oculta a placa e alterna sua
  obrigatoriedade.
- O evento `submit` chama `event.preventDefault()` para evitar que a página
  recarregue.
- Um objeto `dadosFormulario` recebe os valores; `trim()` remove espaços nas
  extremidades.
- `fetch('/api/cadastrar', ...)` envia uma requisição `POST` em JSON.
- `JSON.stringify(...)` converte o objeto para texto JSON.
- `await resposta.json()` converte a resposta do Flask de volta para objeto.
- `resposta.ok` diferencia uma resposta bem-sucedida de um erro HTTP.
- Em caso de sucesso, o formulário é limpo; em caso de falha, a mensagem do
  servidor é mostrada.
- `catch` trata erros de conexão e `finally` sempre reativa o botão.

## 5. Formato dos dados gerados

Depois de um cadastro, o arquivo terá uma estrutura semelhante a esta:

```json
[
    {
        "nome": "Carlos Silva",
        "documento": "12345678-9",
        "tipo_acesso": "Veículo",
        "placa": "ABC-1D23",
        "data_hora": "13/10/2026 01:28:45"
    }
]
```

Cada novo cadastro acrescenta outro objeto à lista, preservando os registros
anteriores.

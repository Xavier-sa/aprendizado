import requests

# URL da API
url = 'https://jsonplaceholder.typicode.com/posts'

# Dados que você deseja enviar (no formato JSON)
data = {
    'title': 'foo',
    'body': 'bar',
    'userId': 1
}

# Fazendo a requisição POST
response = requests.post(url, json=data)

# Verificando o status da resposta
if response.status_code == 201:
    print("Requisição POST bem-sucedida!")
    # Exibindo o conteúdo da resposta (JSON com os dados criados)
    print(response.json())
else:
    print("Erro na requisição:", response.status_code)

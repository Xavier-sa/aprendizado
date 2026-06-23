import requests

# URL da API
url = 'https://jsonplaceholder.typicode.com/posts/1'

# Fazendo a requisição GET
response = requests.get(url)

# Verificando o status da resposta
if response.status_code == 200:
    print("Requisição bem-sucedida!")
    # Exibindo o conteúdo da resposta (JSON no caso)
    print(response.json())
else:
    print("Erro na requisição:", response.status_code)

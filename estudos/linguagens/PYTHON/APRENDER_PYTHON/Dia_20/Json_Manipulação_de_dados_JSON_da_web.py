import json
import requests


url = 'https://api.exemplo.com/dados'# Obter dados JSON de uma API pública (exemplo de API aleatória)
resposta = requests.get(url)


dados = resposta.json()# Converter resposta em JSON


print(dados)# Exibir dados


#? requests.get(): faz uma requisição HTTP GET para obter os dados.
#? resposta.json(): converte a resposta da API (que está em formato JSON) para um objeto Python.
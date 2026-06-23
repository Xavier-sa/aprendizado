import json


with open('dados_salvos.json', 'r') as arquivo_json:# Ler o arquivo JSON
    dados_carregados = json.load(arquivo_json)

print(dados_carregados)


#?funcionou 

#! json.load(): lê dados de um arquivo JSON e os converte em um objeto Python .
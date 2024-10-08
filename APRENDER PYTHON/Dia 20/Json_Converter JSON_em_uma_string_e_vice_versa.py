import json

dados = {'nome': 'Xavier', 'idade': 30, 'profissao': 'Desenvolvedor'}


dados_json = json.dumps(dados, indent=4)# Converter dicionário em string JSON
print(dados_json)

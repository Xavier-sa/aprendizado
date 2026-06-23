import json

# String JSON
dados_json = '{"nome": "Xavier", "idade": 30, "profissao": "Dev Senior"}'

# Converter string JSON em dicionário Python
dados_python = json.loads(dados_json)
print(dados_python)

#!json.loads(): converte uma string JSON em um objeto Python.
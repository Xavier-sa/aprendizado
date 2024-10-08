import json

# Dados a serem convertidos em JSON
dados = {
    'nome': 'Xavier',
    'idade': 22,
    'cidade': 'Campo Grande',
    'habilidades': ['Python', 'HTML', 'Php']
}

# Converter dicionário Python para JSON e salvar em arquivo
with open('dados_salvos.json', 'w') as arquivo_json:
    json.dump(dados, arquivo_json, indent=4)

print("Dados escritos no arquivo JSON com sucesso!")


#! FUNCIONOU!

#?  """json.dump(): converte um objeto Python para o formato JSON e o escreve em um arquivo.
#?     indent=4: formata o JSON com uma indentação de 4 espaços, facilitando a leitura."""
import csv

caminho_arquivo = 'C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens.csv'

with open(caminho_arquivo, mode='r') as file:
    reader = csv.DictReader(file)
    
    # Limpar os nomes das colunas removendo espaços extras
    reader.fieldnames = [field.strip() for field in reader.fieldnames]
    
    # Imprime o cabeçalho lido para verificação
    print("Cabeçalho lido:", reader.fieldnames)
    
    for row in reader:
        nome = row.get("Nome", "N/A")
        poder = row.get("Poder", "N/A")
        planeta = row.get("Planeta", "N/A")
        print(f'Nome: {nome}, Poder: {poder}, Planeta: {planeta}')

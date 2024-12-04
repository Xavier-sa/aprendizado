import csv

caminho_arquivo = 'C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens.csv'

with open(caminho_arquivo, mode='r') as file:
    reader = csv.reader(file)
    header = next(reader)  # Lê o cabeçalho
    for row in reader:
        print(f'Nome: {row[0]}, Poder: {row[1]}, Planeta: {row[2]}')

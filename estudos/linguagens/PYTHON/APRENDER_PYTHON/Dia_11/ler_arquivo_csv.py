import csv

caminho_arquivo = 'C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens.csv'

try:
    with open(caminho_arquivo, mode='r') as file:
        reader = csv.reader(file)
        try:
            header = next(reader)  # Lê o cabeçalho
        except StopIteration:
            print("O arquivo CSV está vazio.")
            exit()
        
        for row in reader:
            print(row)
except FileNotFoundError as e:
    print("Erro:", e)
except Exception as e:
    print("Ocorreu um erro:", e)

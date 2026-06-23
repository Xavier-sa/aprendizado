import csv

caminho_arquivo = 'C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens.csv'
caminho_arquivo_saida ='C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens_altos_poderes.csv'
with open(caminho_arquivo, mode='r') as infile:
    reader = csv.reader(infile)
    header = next(reader)  # Lê o cabeçalho
    
    high_power = []
    for row in reader:
        if int(row[1]) > 10000:
            high_power.append(row)

with open(caminho_arquivo_saida, mode='w', newline='') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(header)  # Escreve o cabeçalho
    writer.writerows(high_power)  # Escreve os dados filtrados

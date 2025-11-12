import csv

caminho_arquivo = 'C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens.csv'

nome_personagem = input("Nome:\n")
poder_personagem = input("Poder:\n")
planeta_personagem = input("Planeta:\n")


new_personagem = [nome_personagem,poder_personagem,planeta_personagem]

with open(caminho_arquivo, mode='a', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(new_personagem)

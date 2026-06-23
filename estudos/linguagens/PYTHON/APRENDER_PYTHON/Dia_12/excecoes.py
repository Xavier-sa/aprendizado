import csv

# Caminho do arquivo CSV
caminho_arquivo = 'C:/Users/Pichau/aprendizado/APRENDER PYTHON/Dia 11/personagens.csv'

# Função para abrir e ler um arquivo CSV com informações de personagens
def abrir_arquivo():
    try:
        with open(caminho_arquivo, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                nome = row.get("Nome", "Desconhecido")
                poder = row.get("Poder", "Desconhecido")
                planeta = row.get("Planeta", "Desconhecido")
                print(f'Nome: {nome}, Poder: {poder}, Planeta: {planeta}')
                
    except FileNotFoundError:
        print(f"Erro: O arquivo '{caminho_arquivo}' não foi encontrado.")
                
    except IOError as e:
        print(f"Erro ao ler o arquivo: {e}")

# Função para dividir o poder de dois personagens
def dividir_poder(poder1, poder2):
    try:
        resultado = poder1 / poder2
        print(f"Resultado da divisão dos poderes: {resultado}")
    except ZeroDivisionError:
        print("Erro: Não é possível dividir por zero.")
    except TypeError:
        print("Erro: Ambos os poderes devem ser números.")

# Função para acessar um personagem de uma lista
def acessar_personagem(personagens, indice):
    try:
        personagem = personagens[indice]
        print(f"Personagem no índice {indice}: {personagem}")
    except IndexError:
        print(f"Erro: Índice {indice} fora dos limites da lista.")
    except TypeError:
        print("Erro: O índice deve ser um número inteiro.")

# Função para buscar um personagem em um dicionário
def buscar_personagem(dicionario, nome):
    try:
        poder = dicionario[nome]
        print(f"Poder de {nome}: {poder}")
    except KeyError:
        print(f"Erro: O personagem '{nome}' não foi encontrado.")
    except TypeError:
        print("Erro: O nome do personagem deve ser uma string.")

# Função principal para testar as funções
if __name__ == "__main__":
    # Testar abertura de arquivo
    abrir_arquivo()

    # Testar divisão de poderes
    dividir_poder(15000, 5000)  # Deve funcionar
    dividir_poder(15000, 0)     # Deve gerar erro de divisão por zero
    dividir_poder(15000, "5")   # Deve gerar erro de tipo

    # Testar acesso a personagens
    personagens = ["Goku", "Vegeta", "Frieza", "Cell", "Majin Buu"]
    acessar_personagem(personagens, 2)  # Deve funcionar
    acessar_personagem(personagens, 10) # Deve gerar erro de índice fora dos limites
    acessar_personagem(personagens, "1") # Deve gerar erro de tipo

    # Testar busca de poderes
    poderes = {"Goku": 9000, "Vegeta": 8500, "Frieza": 12000, "Cell": 10000}
    buscar_personagem(poderes, "Goku")      # Deve funcionar
    buscar_personagem(poderes, "Broly")     # Deve gerar erro de chave não encontrada
    buscar_personagem(poderes, 123)         # Deve gerar erro de tipo

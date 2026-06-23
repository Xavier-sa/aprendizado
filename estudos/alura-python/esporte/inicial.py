import csv
import os
from datetime import datetime

# Configuração de pastas e arquivo
DIRETORIO_BASE = os.path.dirname(__file__)
PASTA_EXERCICIOS = os.path.join(DIRETORIO_BASE, 'exercicios')
CAMINHO_ARQUIVO = os.path.join(PASTA_EXERCICIOS, 'evomgg.csv')

# Tipos de exercícios disponíveis
EXERCICIOS = {
    '1': 'Flexão',
    '2': 'Pular corda',
    '3': 'Abdominal',
    '4': 'Agachamento',
    '5': 'Barra fixa'
}

def criar_pasta_e_arquivo():
    """Cria a pasta e o arquivo CSV com cabeçalhos se não existirem."""
    if not os.path.exists(PASTA_EXERCICIOS):
        os.makedirs(PASTA_EXERCICIOS)
    if not os.path.exists(CAMINHO_ARQUIVO):
        with open(CAMINHO_ARQUIVO, 'w', newline='') as arquivo:
            writer = csv.writer(arquivo)
            writer.writerow(['data', 'exercicio', 'quantidade', 'nivel'])

def escolher_exercicio():
    """Menu para selecionar o tipo de exercício."""
    print("\n--- TIPOS DE EXERCÍCIO ---")
    for codigo, nome in EXERCICIOS.items():
        print(f"{codigo}. {nome}")
    while True:
        opcao = input("Escolha o exercício (1-5): ").strip()
        if opcao in EXERCICIOS:
            return EXERCICIOS[opcao]
        print("Opção inválida. Tente novamente!")

def adicionar_exercicio():
    """Registra um novo exercício no arquivo."""
    criar_pasta_e_arquivo()
    data = datetime.now().strftime('%d/%m/%Y')
    exercicio = escolher_exercicio()
    quantidade = int(input(f"Quantidade de {exercicio.lower()}: "))
    nivel = input("Nível (Iniciante/Intermediário/Avançado): ").capitalize()
    
    with open(CAMINHO_ARQUIVO, 'a', newline='') as arquivo:
        writer = csv.writer(arquivo)
        writer.writerow([data, exercicio, quantidade, nivel])
    print(f"{exercicio} registrado com sucesso em {data}!")

def visualizar_historico():
    """Mostra todo o histórico de exercícios."""
    try:
        with open(CAMINHO_ARQUIVO, 'r') as arquivo:
            reader = csv.reader(arquivo)
            print("\n--- HISTÓRICO DE EXERCÍCIOS ---")
            for linha in reader:
                print(f"{linha[0]:<12} | {linha[1]:<15} | {linha[2]:>3} reps | Nível: {linha[3]}")
    except FileNotFoundError:
        print("Nenhum registro encontrado. Adicione um exercício primeiro.")

# Menu principal
while True:
    print("\n=== MENU EXERCÍCIOS ===")
    print("1. Registrar exercício")
    print("2. Ver histórico")
    print("3. Sair")
    opcao = input("Escolha uma opção: ").strip()
    
    if opcao == '1':
        adicionar_exercicio()
    elif opcao == '2':
        visualizar_historico()
    elif opcao == '3':
        print("Bons treinos! 💪")
        break
    else:
        print("Opção inválida. Tente novamente.")
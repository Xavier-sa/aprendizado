import csv
import os

def adicionar_produto():
    # Verifica se o arquivo existe, se não, cria com cabeçalho
    if not os.path.exists('./estoque.csv'):
        with open('./estoque.csv', 'w', newline='') as arquivo:
            writer = csv.writer(arquivo)
            writer.writerow(['produto', 'quantidade', 'preco'])
    
    # Pede os dados do novo produto
    produto = input("Digite o nome do produto: ").capitalize()
    quantidade = int(input("Digite a quantidade: "))
    preco = float(input("Digite o preço unitário: "))
    
    # Adiciona ao arquivo CSV
    with open('estoque.csv', 'a', newline='') as arquivo:
        writer = csv.writer(arquivo)
        writer.writerow([produto, quantidade, preco])
    
    print(f"Produto '{produto}' adicionado com sucesso!")

def visualizar_estoque():
    try:
        with open('estoque.csv', 'r') as arquivo:
            reader = csv.reader(arquivo)
            print("\n--- ESTOQUE ATUAL ---")
            for linha in reader:
                print(f"{linha[0]:<10} | {linha[1]:>5} | R$ {linha[2]:>5}")
    except FileNotFoundError:
        print("Arquivo 'estoque.csv' não encontrado. Adicione um produto primeiro.")

# Menu interativo
while True:
    print("\n=== MENU ===")
    print("1. Adicionar produto")
    print("2. Visualizar estoque")
    print("3. Sair")
    
    opcao = input("Escolha uma opção: ")
    
    if opcao == '1':
        adicionar_produto()
    elif opcao == '2':
        visualizar_estoque()
    elif opcao == '3':
        print("Saindo do sistema...")
        break
    else:
        print("Opção inválida. Tente novamente.")
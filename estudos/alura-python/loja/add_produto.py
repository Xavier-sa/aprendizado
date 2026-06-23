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
        
##nova funcionalidade editar os produtos( vou usar o metodo la do crud)  (CreatReadUpdateDelete) 
def editar_produto():
    try:
        # Lê o estoque atual
        with open('estoque.csv', 'r') as arquivo:
            reader = csv.reader(arquivo)
            produtos = list(reader)

        if len(produtos) <= 1:
            print("Nenhum produto cadastrado para editar.")
            return

        print("\n--- PRODUTOS DISPONÍVEIS ---")
        for i, linha in enumerate(produtos[1:], start=1):  # pula cabeçalho
            print(f"{i}. {linha[0]} | Quantidade: {linha[1]} | Preço: R$ {linha[2]}")

        escolha = int(input("\nDigite o número do produto que deseja editar: "))
        if escolha < 1 or escolha >= len(produtos):
            print("Escolha inválida.")
            return

        produto_selecionado = produtos[escolha]
        print(f"\nEditando '{produto_selecionado[0]}'")

        novo_nome = input("Novo nome (ou pressione Enter para manter): ").capitalize()
        nova_quantidade = input("Nova quantidade (ou Enter): ")
        novo_preco = input("Novo preço (ou Enter): ")

        if novo_nome:
            produto_selecionado[0] = novo_nome
        if nova_quantidade:
            produto_selecionado[1] = nova_quantidade
        if novo_preco:
            produto_selecionado[2] = novo_preco

        produtos[escolha] = produto_selecionado

        # Reescreve o arquivo com os dados atualizados
        with open('estoque.csv', 'w', newline='') as arquivo:
            writer = csv.writer(arquivo)
            writer.writerows(produtos)

        print("Produto atualizado com sucesso!")

    except FileNotFoundError:
        print("Arquivo 'estoque.csv' não encontrado.")
    except ValueError:
        print("Entrada inválida. Tente novamente.")


# Menu interativo
while True:
    print("\n=== MENU ===")
    print("1. Adicionar produto")
    print("2. Visualizar estoque")
    print("3. Editar produtos no estoque(NOME,QUANTIDADE,PREÇO)")
    print("0. Sair")
    
    opcao = input("Escolha uma opção: ")
    
    if opcao == '1':
        adicionar_produto()
    elif opcao == '2':
        visualizar_estoque()
    elif opcao == '3':
        editar_produto()
        # print("testes")
    elif opcao == '0':
        print("Saindo do sistema...")
        break
    else:
        print("Opção inválida. Tente novamente.")
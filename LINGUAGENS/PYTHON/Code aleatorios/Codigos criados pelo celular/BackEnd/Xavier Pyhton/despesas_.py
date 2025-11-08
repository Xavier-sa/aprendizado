import json
import os

# Nome do arquivo JSON onde os dados serão armazenados
FILENAME = 'financas.json'

# Função para carregar dados do arquivo JSON
def carregar_dados():
    if os.path.exists(FILENAME):
        with open(FILENAME, 'r') as file:
            return json.load(file)
    return {'despesas': [], 'receitas': [], 'emprestimos': []}

# Função para salvar dados no arquivo JSON
def salvar_dados(dados):
    with open(FILENAME, 'w') as file:
        json.dump(dados, file, indent=4)

# Função para adicionar uma nova despesa
def adicionar_despesa(descricao, valor):
    dados = carregar_dados()
    dados['despesas'].append({'descricao': descricao, 'valor': valor})
    salvar_dados(dados)

# Função para adicionar uma nova receita
def adicionar_receita(descricao, valor):
    dados = carregar_dados()
    dados['receitas'].append({'descricao': descricao, 'valor': valor})
    salvar_dados(dados)

# Função para adicionar um novo empréstimo
def adicionar_emprestimo(descricao, valor):
    dados = carregar_dados()
    dados['emprestimos'].append({'descricao': descricao, 'valor': valor})
    salvar_dados(dados)

# Função para remover uma despesa pelo índice
def remover_despesa(indice):
    dados = carregar_dados()
    if 0 <= indice < len(dados['despesas']):
        dados['despesas'].pop(indice)
        salvar_dados(dados)
    else:
        print("Índice de despesa inválido.")

# Função para remover uma receita pelo índice
def remover_receita(indice):
    dados = carregar_dados()
    if 0 <= indice < len(dados['receitas']):
        dados['receitas'].pop(indice)
        salvar_dados(dados)
    else:
        print("Índice de receita inválido.")

# Função para remover um empréstimo pelo índice
def remover_emprestimo(indice):
    dados = carregar_dados()
    if 0 <= indice < len(dados['emprestimos']):
        dados['emprestimos'].pop(indice)
        salvar_dados(dados)
    else:
        print("Índice de empréstimo inválido.")

# Função para mostrar todos os dados
def mostrar_tudo():
    dados = carregar_dados()
    print("Despesas:")
    for i, despesa in enumerate(dados['despesas']):
        print(f"{i}: {despesa['descricao']} - R${despesa['valor']:.2f}")
    print("\nReceitas:")
    for i, receita in enumerate(dados['receitas']):
        print(f"{i}: {receita['descricao']} - R${receita['valor']:.2f}")
    print("\nEmpréstimos:")
    for i, emprestimo in enumerate(dados['emprestimos']):
        print(f"{i}: {emprestimo['descricao']} - R${emprestimo['valor']:.2f}")

# Código principal
if __name__ == "__main__":
    while True:
        print("\n1. Adicionar despesa")
        print("2. Adicionar receita")
        print("3. Adicionar empréstimo")
        print("4. Remover despesa")
        print("5. Remover receita")
        print("6. Remover empréstimo")
        print("7. Mostrar todos")
        print("8. Sair")
        
        opcao = input("Escolha uma opção: ")
        
        if opcao == '1':
            descricao = input("Descrição da despesa: ")
            valor = float(input("Valor da despesa: "))
            adicionar_despesa(descricao, valor)
        elif opcao == '2':
            descricao = input("Descrição da receita: ")
            valor = float(input("Valor da receita: "))
            adicionar_receita(descricao, valor)
        elif opcao == '3':
            descricao = input("Descrição do empréstimo: ")
            valor = float(input("Valor do empréstimo: "))
            adicionar_emprestimo(descricao, valor)
        elif opcao == '4':
            mostrar_tudo()
            indice = int(input("Índice da despesa a ser removida: "))
            remover_despesa(indice)
        elif opcao == '5':
            mostrar_tudo()
            indice = int(input("Índice da receita a ser removida: "))
            remover_receita(indice)
        elif opcao == '6':
            mostrar_tudo()
            indice = int(input("Índice do empréstimo a ser removido: "))
            remover_emprestimo(indice)
        elif opcao == '7':
            mostrar_tudo()
        elif opcao == '8':
            break
        else:
            print("Opção inválida. Tente novamente.")

print("DESAFIO CHAT:")

def soma():
    # Desafio 1
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
    soma = num1 + num2
    print(f"A soma é {soma}")

def palindromos():
    # Desafio 2
    palavra = input("Digite uma palavra: ").lower().replace(" ", "")
    if palavra == palavra[::-1]:
        print("A palavra é um palíndromo.")
    else:
        print("A palavra não é um palíndromo.")

def fatorial():
    # Desafio 3
    num = int(input("Digite um número: "))
    fatorial = 1

    if num < 0:
        print("Não existe fatorial para números negativos.")
    elif num == 0 or num == 1:
        print(f"O fatorial de {num} é 1.")
    else:
        for i in range(1, num + 1):
            fatorial *= i
        print(f"O fatorial de {num} é {fatorial}.")

def crud_simples():
    # Desafio 4
    nomes = []

    while True:
        print("\n1. Adicionar nome")
        print("2. Remover nome")
        print("3. Listar nomes")
        print("4. Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            nome = input("Digite o nome: ")
            nomes.append(nome)
            print("Nome adicionado com sucesso!")
        elif opcao == "2":
            nome = input("Digite o nome a ser removido: ")
            if nome in nomes:
                nomes.remove(nome)
                print("Nome removido com sucesso!")
            else:
                print("Nome não encontrado!")
        elif opcao == "3":
            print("Nomes cadastrados:")
            for n in nomes:
                print(n)
        elif opcao == "4":
            print("Saindo do CRUD...")
            break
        else:
            print("Opção inválida. Tente novamente.")

def jogo_adivinhacao():
    # Desafio Bônus
    import random
    numero_sorteado = random.randint(1, 100)
    tentativa = 0

    print("Tente adivinhar o número entre 1 e 100.")

    while True:
        tentativa += 1
        chute = int(input("Digite seu palpite: "))
        
        if chute < numero_sorteado:
            print("Maior!")
        elif chute > numero_sorteado:
            print("Menor!")
        else:
            print(f"Parabéns! Você acertou em {tentativa} tentativas.")
            break

def menu_principal():
    while True:
        print("\nMENU PRINCIPAL")
        print("1. Soma de números")
        print("2. Verificador de palíndromos")
        print("3. Fatorial de um número")
        print("4. CRUD Simples")
        print("5. Jogo da Adivinhação")
        print("6. Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            soma()
        elif opcao == "2":
            palindromos()
        elif opcao == "3":
            fatorial()
        elif opcao == "4":
            crud_simples()
        elif opcao == "5":
            jogo_adivinhacao()
        elif opcao == "6":
            print("Encerrando o programa...")
            break
        else:
            print("Opção inválida. Tente novamente.")

# Chama o menu principal
menu_principal()

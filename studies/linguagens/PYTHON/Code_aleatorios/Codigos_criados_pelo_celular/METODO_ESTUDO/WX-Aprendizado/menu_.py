def menu():
    print("Bem-vindo ao portal WX\nQual opção deseja:\n(1) EXERCÍCIOS\n(2) RESOLUÇÃO\n(3) SAIR")
    menu_opcao = input("Escolha: ")
    if menu_opcao == '1':
        um_part1()
    elif menu_opcao == '2':
        resolucao()
    elif menu_opcao == '3':
        print("Encerrando...")
    else:
        print("Opção inválida. Tente novamente.")
        menu()

def um_part1():
    print("Escolha uma opção para Exercícios:")
    print("(1) Exercício 1 - Parte Um")
    print("(2) Exercício 1 - Parte Dois")
    print("(3) Exercício 1 - Parte Três")
    print("(4) Voltar ao menu principal")
    
    opcao = input("Qual opção desejada: ")
    if opcao == '1':
        print("Acessando.... Exercício 1 - Parte Um (exibir números)")
    elif opcao == '2':
        um_part2()
    elif opcao == '3':
        um_part3()
    elif opcao == '4':
        menu()
    else:
        print("Opção inválida. Tente novamente.")
        um_part1()

def um_part2():
    print("Escolha a opção para Exercício 1 - Parte Dois:")
    print("(1) Voltar ao menu de exercícios")
    print("(2) Voltar ao menu principal")
    
    opcao = input("Qual opção desejada: ")
    if opcao == '1':
        um_part1()
    elif opcao == '2':
        menu()
    else:
        print("Opção inválida. Tente novamente.")
        um_part2()

def um_part3():
    print("Escolha a opção para Exercício 1 - Parte Três:")
    print("(1) Voltar ao menu de exercícios")
    print("(2) Voltar ao menu principal")
    
    opcao = input("Qual opção desejada: ")
    if opcao == '1':
        um_part1()
    elif opcao == '2':
        menu()
    else:
        print("Opção inválida. Tente novamente.")
        um_part3()

def resolucao():
    print("Resolução de exercícios será implementada aqui.")
    menu()



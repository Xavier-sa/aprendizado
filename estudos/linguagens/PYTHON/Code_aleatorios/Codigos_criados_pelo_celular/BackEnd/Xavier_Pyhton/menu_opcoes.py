while True:
    print(f"{'-'*4} MENU {'-'*4}")
    print(f"{'-'*4} {'#'}-> 1. Opção 1 {'#'}{'-'*4}")
    print(f"{'-'*4} {'#'}-> 2. Opção 2 {'#'}{'-'*4}")
    print(f"{'-'*4} {'#'}-> 3. Sair  3 {'#'}{'-'*4}")
    print(f"{'-'*4} {'#'}-> 4. Contatar Xavier 4{'#'}{'-'*4}")
    
    opcao = input("Escolha uma opcao(Entre 1 e 4):")
     
    if opcao == '1':
        print("Opção 1 selecionada")
        print('-'*20)
    elif opcao == '2':
        print("Opção 2 selicionada")
        print('-'*20)
    elif opcao == '3':
        print('Encerrando!')
        break
        print('-'*20)
    elif opcao == '4':
        print('#'*20)
        print('Xavier #Dev#, entre em contato diretamento pelo whatsApp: +55 ** *****')
        print('#'*20)
    else: 
        print('*'*20)
        print("Tente Novamente!")
        print('*'*20)
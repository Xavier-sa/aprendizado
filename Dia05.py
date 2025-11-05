import sys

print("Hello, World!")
#menu
print("      --- MENU ---    ")
print("     (1) LOGAR        ")
print("     (2) CADASTRAR    ")
opcao = str(input("Informe a OPÇÃO(1/2):"))
if opcao == "1":
    print("Vamos Logar!")
    print("Username:")
    username = input("")
    if username == "xavier":
        print("Bem Vindo Developer!")
        print("Informe a senha:")
        senha = input("")
        if senha == "12345":
            print("Credenciais Confirmadas")
        else: 
            print("Acesso Negado!")
            sys.exit()
            
    else:
        print("Acesso Negado!")
        sys.exit()
        
elif opcao == "2":
      print("INSIRA NOME E SENHA:")
      credencial = {}
      nome = input("Informe Nome:")
      senha = input("Informe Senha:")
      credencial[nome] = senha
      print("Cadastrado com Sucesso!")
      
else:
    sys.exit()

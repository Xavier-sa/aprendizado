
print("Hello, World!")
def senha():
    senha=input("Informe a senha")
    if senha=="12345":
        print(f"{nome} possui requisitos suficientes para desbloquear sua nova habilidade")

def home():
    print("Menu")
    print("1-Senha")
    print("2-Voltar")
    
def beber():
    print("O item foi consumido")
    
def abrir_portao():    
    print(f"{nome} abriu o portao!")
    
def fechar_portao():
     print(f"{nome} fechou o portao!")
     
def status():
     print( f"em desenvolvimento!") 
     
     

while True:
    nome = input("INFORME SEU NOME PARA INICIAR :")
    if nome=="xavier":
        print(f"Bem vindo caro NPC ({nome})")
        print("Oque deseja fazer?")
        opcao =int(input("Escolha do 1 ao 4:"))
        print(f"Opcao escolhida foi a numero: {opcao}!")
        if opcao == 1:
            print("Vou beber agua!")
            beber()
        elif opcao ==2:
            print("Vou beber café")
            beber()
        elif opcao ==3:    
            print("Vou beber coca cola")
            
        elif opcao ==4:
            print("Abrir o portão")
            abrir_portao()
            pergunta= input("Deseja fechar (sim/nao)?:")
            if pergunta== "sim":
                fechar_portao()
            elif pergunta=="não":
                print(f"ok {nome}! o portao permanecera aberto")e
            else:
                print("")
                status()
            
    else:
        home()
    

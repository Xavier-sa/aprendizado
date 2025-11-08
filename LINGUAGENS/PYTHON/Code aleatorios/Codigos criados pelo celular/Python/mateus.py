def usuario():
    print(f"Seja bem vindo!\n Sistema Integrado\n")

nome = input("informe seu nome:").lower()

if nome == "xavier":
    print("Ele foi promovido!")
    
else:
    print("Tente novamente!replay")
    
funcao = input("informe sua função:").lower()

if funcao == "dono":
    print("Acesso administrativo:")
    print(f'O sr {nome} dono da loja acessou o sistema')
    
elif funcao == "gerente":
    print(f"O gerente {nome} acessou!")
    
else:
    usuario()
salario = float(input("informe salario:"))


    
if salario >10000:
    print("Proprietario")
    
    
elif salario == 5000:
    print("Gerente")
    
res= (nome,funcao,salario)

print(res)


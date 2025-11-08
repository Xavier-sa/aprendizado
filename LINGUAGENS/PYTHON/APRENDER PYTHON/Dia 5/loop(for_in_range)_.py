 #! Imprimir números de 0 a 9
for i in range(10):
    print(i)


 #? habilidades = int(input("Habilidades Disponiveis são:\n1-Voo\n2-Telecinese\n3-Força Bruta\n4-Imortalidade\n"

 
    
habilidades = ['Voo', 'Telecinese', 'Força Bruta', 'Imortalidade']
print(f"{'-'*30}")
print(f"Habilidades Disponíveis são:\n{'-'*30}")
for i, habilidade in enumerate(habilidades, start=1):
    print(f"{i} - {habilidade} \n{'-'*30}")


try:
    escolha = int(input("\nEscolha uma habilidade digitando o número correspondente: "))
    if 1 <= escolha <= len(habilidades):
        print(f"Você escolheu: {habilidades[escolha - 1]}")
    else:
        print("Escolha inválida. Por favor, escolha um número entre 1 e 4.")
        
except ValueError:
    print("Entrada inválida. Por favor, digite um número.")
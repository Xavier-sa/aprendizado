'''
12. Escreva um algoritmo em PORTUGOL 
que leia um número e informe se ele é divisível
por 3 e por 7.
'''
num = int(input("INSIRA UM NUMERO:"))

if num % 3 == 0 and num % 7 == 0:
    print(f"é divisível por 3 e por 7.")

else:
    print(f"não é divisível por 3 ou por 7.")

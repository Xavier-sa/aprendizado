'''
2. Escrever um algoritmo que leia dos valores inteiros
 distintos e informe qual é maior
'''
num1 = int(input("DIGITE O PRIMEIRO NUMERO: "))
num2 = int(input("DIGITE O SEGUNDO NUMERO: "))

if(num1 > num2):
    print("o numero 1 é maior que o numero 2!".format(num1))
elif(num2 > num1):
    print("o numero 2 é maior que o numero 1!".format(num2))
else:
    print("o numero 1 é igual ao  2!".format(num1))
'''
7- Construir um algoritmo em PORTUGOL  que leia dois numeros 
e efetue a adição. Caso o valor somado seja maior que 20, este devera ser apresentado somando-se a ele mais 8;
caso o valor somado seja menor ouigual a 20, este devera ser apresentado subtraindo-se 5.
'''
#entrada
numero1 = float(input("Digite o primeiro número: "))
numero2 = float(input("Digite o segundo número: "))
#processamento
soma = numero1 + numero2
if soma > 20:
    resultado = soma + 8
else:
    resultado = soma - 5
    print(f"O resultado final é: {resultado}")


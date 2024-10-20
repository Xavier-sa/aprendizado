'''
8- Escreva um algoritmo em PORTUGOL que leia um numero 
e imprima a raiz quadrada do numero caso ele seja positivo 
ou igual a zero e o quadrado do numero caso ele seja negativo.'''
#entradas
import math
numero = float(input("Digite um número: "))
#processamento
if numero >= 0:
    resultado = math.sqrt(numero)
    print(f"A raiz quadrada de {numero} é: {resultado}")
else:
    resultado = numero ** 2
    print(f"O quadrado de {numero} é: {resultado}")

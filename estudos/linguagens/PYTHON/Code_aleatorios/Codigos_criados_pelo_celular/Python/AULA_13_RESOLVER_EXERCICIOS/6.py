'''
6- Escreva um algoritmo em PORTUGOL para determinar se um dado numero N (recebido atraves do teclado)
é POSITIVO, NEGATIVO ou NULO
'''
#entrada
numero = float(input("Digite um número: "))
#processamento
if numero > 0:
    print(f"O número {numero} é positivo.")
elif numero < 0:
    print(f"O número {numero} é negativo.")
else:
    print(f"O número é nulo (zero).")



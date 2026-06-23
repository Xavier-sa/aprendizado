'''
16. Escrever um algoritmo que leia
três valores inteiros distintos e os escreva em ordem
crescente'''
#entrada
num1 = int(input('DIGITE N1:'))
num2 = int(input('DIGITE N2:'))
num3 = int(input('DIGITE N3:'))
#processamento
valores = [num1, num2, num3]
valores.sort()
#saida
print("Valores em ordem crescente:", valores)

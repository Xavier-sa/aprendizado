'''
17. Escrever um algoritmo que leia três valores inteiros e verifique se eles podem ser os
lados de um triângulo. Se forem, informar qual o tipo de triângulo que eles formam:
equilátero, isóscele ou escaleno.
Propriedade: o comprimento de cada lado de um triângulo é menor do que a soma dos
comprimentos dos outros dois lados.
Triângulo Equilátero: aquele que tem os comprimentos dos três lados iguais;
Triângulo Isóscele: aquele que tem os comprimentos de dois lados iguais. Portanto,
todo triângulo equilátero é também isóscele;
Triângulo Escaleno: aquele que tem os comprimentos de seus três lados diferentes.
'''
#entrada
'''
Se todos os três lados são iguais, é um triângulo equilátero.
Se dois lados são iguais é um triângulo isóscele.
Se todos os três lados são diferentes, é um triângulo escaleno.
'''
lado1 = int(input("Digite o primeiro lado do triângulo: "))
lado2 = int(input("Digite o segundo lado do triângulo: "))
lado3 = int(input("Digite o terceiro lado do triângulo: "))

#processamento
if lado1 + lado2 > lado3 and lado1 + lado3 > lado2 and lado2 + lado3 > lado1:
    if lado1 == lado2 == lado3:
        print("Os três lados formam um triângulo equilátero.")
    elif lado1 == lado2 or lado1 == lado3 or lado2 == lado3:
        print("Os três lados formam um triângulo isóscele.")
    else:
        print("Os três lados formam um triângulo escaleno.")
else:
        print("Os valores não formam um triângulo.")

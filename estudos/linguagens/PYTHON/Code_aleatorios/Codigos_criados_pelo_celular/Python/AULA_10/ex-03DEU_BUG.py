'''
3 CRIE UM ALGORITMO PARA CALCULAR A AREA DE UM QUADRADO, RETÂNGULO, TRIANGULO E CIRCULO.
'''

#entrada 
lado_quadrado = int(input("INSIRA O VALOR DO LADO DO QUADRADO:"))

base_retangulo = int(input("INSIRA O VALOR DA BASE DO RETANGULO:"))

altura_retangulo = int(input("INSIRA O VALOR DA ALTURA DO RETANGULO:"))

base_triangulo = int(input("INSIRA O VALOR DA BASE DO TRIANGULO:"))

raio_circulo = float(input("INSIRA O VALOR DO RAIO DO CIRCULO:"))

import math

# Função para calcular a área de um quadrado
def calcular_area_quadrado():
    lado = float(input("Insira o comprimento do lado do quadrado: "))
    area = lado ** 2
    print(f"A área do quadrado é: {area:.2f}")

# Função para calcular a área de um retângulo
def calcular_area_retangulo():
    comprimento = float(input("Insira o comprimento do retângulo: "))
    largura = float(input("Insira a largura do retângulo: "))
    area = comprimento * largura
    print(f"A área do retângulo é: {area:.2f}")

# Função para calcular a área de um triângulo
def calcular_area_triangulo():
    base = float(input("Insira a base do triângulo: "))
    altura = float(input("Insira a altura do triângulo: "))
    area = (base * altura) / 2
    print(f"A área do triângulo é: {area:.2f}")

# Função para calcular a área de um círculo
def calcular_area_circulo():
    raio = float(input("Insira o raio do círculo: "))
    area = math.pi * raio ** 2
    print(f"A área do círculo é: {area:.2f}")

# Função para exibir o menu de opções e chamar a função correspondente
def menu():
    print("Escolha a forma para calcular a área:")
    print("1. Quadrado")
    print("2. Retângulo")
    print("3. Triângulo")
    print("4. Círculo")

    escolha = int(input("Digite o número da opção desejada: "))

    if escolha == 1:
        calcular_area_quadrado()
    elif escolha == 2:
        calcular_area_retangulo()
    elif escolha == 3:
        calcular_area_triangulo()
    elif escolha == 4:
        calcular_area_circulo()
    else:
        print("Opção inválida! Tente novamente.")

# Chama a função de menu para iniciar o programa
menu()


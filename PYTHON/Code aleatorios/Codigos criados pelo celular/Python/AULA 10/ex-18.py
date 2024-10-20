'''18. Escreva um algoritmo que leia o peso e a altura de uma pessoa, calcule e imprima o
seu IMC. o IMC é dado pela seguinte fórmula: 𝐼𝑀𝐶 = 𝑝𝑒𝑠𝑜 / 𝑎𝑙𝑡𝑢𝑟𝑎2.'''

def calcular_imc():
    #entrada
    peso = float(input("Insira o peso da pessoa em quilogramas (kg): "))
    altura = float(input("Insira a altura da pessoa em metros (m): "))
    #processamento
    imc = peso / (altura ** 2)
    #saida
    print(f"\nO IMC da pessoa é: {imc:.2f}")
#lembre se auto
calcular_imc()

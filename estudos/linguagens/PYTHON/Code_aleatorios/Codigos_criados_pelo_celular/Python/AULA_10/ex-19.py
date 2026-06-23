'''19. Faça um algoritmo que calcule e imprima o gasto de uma viagem de carro de uma
cidade a outra, sabendo que:
a. o carro utilizado roda 15 Km com 1 litro de gasolina;
b. o preço médio da gasolina é de R$5,30;
c. o valor de cada pedágio é de R$8,00.'''

def calcular_gasto_viagem():
    #entradas
    distancia_total = float(input("Insira a distância total da viagem em quilômetros (km): "))
    num_pedagios = int(input("Insira o número de pedágios na viagem: "))
    consumo_carro = 15
    preco_gasolina = 5.30
    valor_pedagio = 8.00

    #processamento
    consumo_total_combustivel = distancia_total / consumo_carro
    custo_combustivel = consumo_total_combustivel * preco_gasolina
    custo_pedagios = num_pedagios * valor_pedagio
    gasto_total_viagem = custo_combustivel + custo_pedagios

    #saida
    print(f"\nO gasto total da viagem é: R$ {gasto_total_viagem:.2f}")

#aqui é pra puxa o programa
calcular_gasto_viagem()

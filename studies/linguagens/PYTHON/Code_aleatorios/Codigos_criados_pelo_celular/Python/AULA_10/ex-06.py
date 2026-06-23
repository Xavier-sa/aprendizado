'''6. Escrever um algoritmo para determinar o consumo médio de um automóvel sendo
fornecida a distância total percorrida pelo automóvel e o total de combustível gasto.
'''

def calcular_consumo(distancia, combustivel_gasto):
    consumo_medio = distancia / combustivel_gasto
    return consumo_medio

distancia_percorrida = float(input("Insira a distância total percorrida pelo automóvel (em km): "))

combustivel_gasto = float(input("Insira o total de combustível gasto pelo automóvel (em litros): "))

consumo_medio = calcular_consumo(distancia_percorrida, combustivel_gasto)

print(f"O consumo médio do automóvel é de {consumo_medio:.2f} km/l.")

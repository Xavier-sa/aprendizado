'''16. O custo ao consumidor de um carro novo é a soma do custo de fábrica com a
percentagem do distribuidor e dos impostos (aplicados, primeiro os impostos sobre o
custo de fábrica, e depois a percentagem do distribuidor sobre o resultado). Supondo
que a percentagem do distribuidor seja de 28% e os impostos 45%. Escrever um
algoritmo que leia o custo de fábrica de um carro e informe o custo ao consumidor do
mesmo.'''


def calcular_custo_ao_consumidor():
    # entrada
    custo_fabrica = float(input("Insira o custo de fábrica do carro: R$ "))
    taxa_impostos = 0.45
    taxa_distribuidor = 0.28
 
    #procesamento
    impostos = custo_fabrica * taxa_impostos
    custo_apos_impostos = custo_fabrica + impostos
    percentual_distribuidor = custo_apos_impostos * taxa_distribuidor
    custo_ao_consumidor = custo_apos_impostos + percentual_distribuidor

    #saida
    print(f"O custo ao consumidor do carro é: R$ {custo_ao_consumidor:.2f}")

#executa
calcular_custo_ao_consumidor()

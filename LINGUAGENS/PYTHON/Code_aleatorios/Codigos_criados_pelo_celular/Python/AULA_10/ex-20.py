'''20. Faça um programa para uma loja de tintas. O programa deverá pedir o tamanho em
metros quadrados da área a ser pintada. Considere que a cobertura da tinta é de 1 litro
para cada 6 metros quadrados e que a tinta é vendida em latas de 18 litros, que custam
R$ 80,00 ou em galões de 3,6 litros, que custam R$ 25,00. Informe ao usuário as
quantidades de tinta a serem compradas e os respectivos preços em 3 situações:
a. comprar apenas latas de 18 litros;
b. comprar apenas galões de 3,6 litros;
c. misturar latas e galões, de forma que o desperdício de tinta seja menor.
Acrescente 10% de folga e sempre arredonde os valores para cima, isto é,
considere latas cheias.'''

def calcular_tinta():
    #entrada
    area_pintada = float(input("Insira o tamanho da área a ser pintada em metros quadrados (m²): "))
    area_pintada *= 1.10
    cobertura_tinta = 6
#processamento
    tinta_necessaria = area_pintada / cobertura_tinta
    lata_tamanho = 18  # 18 litros por lata
    lata_preco = 80.00  # R$ 80,00 por lata
    galao_tamanho = 3.6  # 3,6 litros por galão
    galao_preco = 25.00  # R$ 25,00 por galão
    latas_necessarias = tinta_necessaria // lata_tamanho
    # Verifique se há sobra de tinta necessária que não é uma lata completa
    if tinta_necessaria % lata_tamanho > 0:
        latas_necessarias += 1  # Adicione uma lata para cobrir a sobra

    custo_latas = latas_necessarias * lata_preco

    # Calcule a quantidade de galões necessários para cobrir a tinta necessária
    galoes_necessarios = tinta_necessaria // galao_tamanho
    # Verifique se há sobra de tinta necessária que não é um galão completo
    if tinta_necessaria % galao_tamanho > 0:
        galoes_necessarios += 1  # Adicione um galão para cobrir a sobra

    custo_galoes = galoes_necessarios * galao_preco

    # Calcule a mistura ideal de latas e galões para minimizar o desperdício de tinta
    latas_mistura = tinta_necessaria // lata_tamanho
    tinta_restante = tinta_necessaria % lata_tamanho

    # Inicialize os galões necessários para a mistura
    galoes_mistura = 0

    # Se houver tinta restante, calcule a quantidade de galões necessários para cobri-la
    if tinta_restante > 0:
        galoes_mistura = tinta_restante // galao_tamanho
        if tinta_restante % galao_tamanho > 0:
            galoes_mistura += 1  # Adicione um galão para cobrir a sobra

    # Calcule o custo total da mistura de latas e galões
    custo_mistura = (latas_mistura * lata_preco) + (galoes_mistura * galao_preco)

    # Exiba os resultados
    print(f"\nSituação 1: Apenas latas de 18 litros")
    print(f"Quantidade de latas necessárias: {int(latas_necessarias)}")
    print(f"Custo total: R$ {custo_latas:.2f}")

    print(f"\nSituação 2: Apenas galões de 3,6 litros")
    print(f"Quantidade de galões necessários: {int(galoes_necessarios)}")
    print(f"Custo total: R$ {custo_galoes:.2f}")

    print(f"\nSituação 3: Mistura de latas e galões")
    print(f"Quantidade de latas necessárias: {int(latas_mistura)}")
    print(f"Quantidade de galões necessários: {int(galoes_mistura)}")
    print(f"Custo total: R$ {custo_mistura:.2f}")

# Chama a função para calcular a quantidade de tinta necessária e os custos associados
calcular_tinta()

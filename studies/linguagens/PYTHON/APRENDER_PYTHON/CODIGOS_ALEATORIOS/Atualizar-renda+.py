from datetime import datetime

#? Calcular o valor das  dívidas
def calcular_pagamento_mensal(renda, despesas_fixas, valor_divida_total, data_inicio, data_fim):
    #  mensal
    saldo_disponivel = renda - despesas_fixas
    
    # meses
    hoje = datetime.now()
    data_inicio = datetime.strptime(data_inicio, "%Y-%m-%d")
    data_fim = datetime.strptime(data_fim, "%Y-%m-%d")
    
    meses_restantes = (data_fim.year - data_inicio.year) * 12 + (data_fim.month - data_inicio.month)
    
    if meses_restantes <= 0:
        return "A data final deve ser posterior à data de início."

    # mensal necessário 
    valor_mensal_necessario = valor_divida_total / meses_restantes
    
    return saldo_disponivel, valor_mensal_necessario

# Função para ajustar e imprimir o plano financeiro
def ajustar_plano(renda, despesas_fixas, valor_divida_total, data_inicio, data_fim, reserva_emergencia):
    saldo_disponivel, valor_mensal_necessario = calcular_pagamento_mensal(renda, despesas_fixas, valor_divida_total, data_inicio, data_fim)
    
    if isinstance(saldo_disponivel, str):  # Se o retorno é uma mensagem de erro
        return saldo_disponivel
    
    # Ajustar o valor disponível após reservar para emergências
    saldo_disponivel_ajustado = saldo_disponivel - reserva_emergencia    
    print(f"{'-'*40}")

    
    print(f"\n \tSaldo disponível mensal: R${saldo_disponivel:.2f}")
    print(f"{'-'*40}")
    print(f"Valor mensal necessário para quitar a dívida total: R${valor_mensal_necessario:.2f}")
    print(f"{'-'*40}")
    print(f"Saldo disponível após reservar para emergências: R${saldo_disponivel_ajustado:.2f}")
    print(f"{'-'*40}")


    if saldo_disponivel_ajustado >= valor_mensal_necessario:
        print("Você pode quitar suas dívidas conforme o plano.")    
        print(f"{'-'*40}")

    else:
        print("Você precisará ajustar o plano para aumentar a renda ou reduzir despesas.")    
        print(f"{'-'*40}")


# Função para calcular o valor mensal de cada tipo de dívida
def calcular_detalhamento_dividas(despesas_dividas, valor_divida_total, data_inicio, data_fim):
    # Calcular o número de meses restantes
    hoje = datetime.now()
    data_inicio = datetime.strptime(data_inicio, "%Y-%m-%d")
    data_fim = datetime.strptime(data_fim, "%Y-%m-%d")
    
    meses_restantes = (data_fim.year - data_inicio.year) * 12 + (data_fim.month - data_inicio.month)
    
    if meses_restantes <= 0:
        return "A data final deve ser posterior à data de início."

    # Calcular o valor mensal necessário para quitar a dívida total
    valor_mensal_necessario = valor_divida_total / meses_restantes
    
    print(f"Plano detalhado para quitação das dívidas:")
    print(f"{'-'*40}")

    for tipo, valor in despesas_dividas.items():
        valor_mensal_tipo = valor / meses_restantes
        print(f"{tipo}: Total R${valor:.2f} -> Valor mensal: R${valor_mensal_tipo:.2f}")    
        print(f"{'-'*40}")

    
    print(f"\nValor mensal necessário para quitar a dívida total: R${valor_mensal_necessario:.2f}")
    print(f"{'-'*40}")

    print(f"Meses restantes: {meses_restantes}")

# Dados inciio
renda_mensal = 1800
despesas_fixas_mensais = 1630  # Moradia + Internet + Água + Luz + Gasolina + Oleo
valor_divida_total = 70000
data_inicio_plano = "2024-08-01"
data_fim_plano = "2026-12-31"
reserva_emergencia = 50

# Detalhamento das dívidas
despesas_dividas = {
    'Cartão de Crédito': 3000,
    'Empréstimos Pessoais': 2000,
    'Outras Dívidas': 2000
}

# Ajustar o plano financeiro
ajustar_plano(renda_mensal, despesas_fixas_mensais, valor_divida_total, data_inicio_plano, data_fim_plano, reserva_emergencia)

# Calcular e imprimir detalhamento das dívidas
calcular_detalhamento_dividas(despesas_dividas, valor_divida_total, data_inicio_plano, data_fim_plano)

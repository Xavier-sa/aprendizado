def calcular_saldo(transacoes):
    saldo = 0

    # Itera sobre cada transação na lista e atualiza o saldo
    for transacao in transacoes:
        saldo += transacao

    # Retorna o saldo formatado em moeda brasileira com duas casas decimais
    return f"Saldo: R$ {saldo:.2f}"

# Lê a entrada do usuário
entrada_usuario = input()

# Remove os colchetes e espaços em branco
entrada_usuario = entrada_usuario.strip("[]").replace(" ", "")

# Converte a entrada em uma lista de números float
transacoes = [float(valor) for valor in entrada_usuario.split(",")]

# Calcula o saldo com base nas transações informadas
resultado = calcular_saldo(transacoes)

# Exibe o resultado
print(resultado)

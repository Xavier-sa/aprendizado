
'''13. Faça um algoritmo que receba um valor que foi depositado e exiba o valor com
rendimento após um mês.
Considere fixo o juro da poupança em 0,70% a. m'''

# entrada
def calcular_rendimento():
    # Solicite ao usuário o valor que foi depositado
    valor_depositado = float(input("Insira o valor depositado: R$ "))

    # Defina o juro da poupança fixo (0,70% ao mês)
    juro_poupanca = 0.007  # 0,70% convertido para decimal (0,007)

    # procesamento
    rendimento = valor_depositado * juro_poupanca

    # Calcule o valor final após um mês
    valor_final = valor_depositado + rendimento

    # Saida
    print(f"\nValor depositado: R$ {valor_depositado:.2f}")
    print(f"Rendimento após um mês: R$ {rendimento:.2f}")
    print(f"Valor final após um mês: R$ {valor_final:.2f}")

# inicia o programa auto
calcular_rendimento()

'''7. Escrever um algoritmo que leia o nome de um vendedor, o seu salário fixo e o total de
vendas efetuadas por ele no mês (em dinheiro). Sabendo que este vendedor ganha 15%
de comissão sobre suas vendas efetuadas, informar o seu nome, o salário fixo e salário
no final do mês.'''


#entrada
nome_vendedor = input("Insira o nome do vendedor: ")
salario_fixo = float(input("Insira o salário fixo do vendedor: "))

#procesamento
total_vendas = float(input("Insira o total de vendas efetuadas pelo vendedor no mês (em dinheiro): "))

# Calcule a comissão sobre as vendas (15%)
comissao = total_vendas * 0.15

# Calcule o salário final (salário fixo + comissão)
salario_final = salario_fixo + comissao

#saida
print(f"VENDEDOR")
print(f"Nome: {nome_vendedor}")
print(f"Salário fixo: R$ {salario_fixo:.2f}")
print(f"Comissão: R$ {comissao:.2f}")
print(f"Salário final do mês: R$ {salario_final:.2f}")
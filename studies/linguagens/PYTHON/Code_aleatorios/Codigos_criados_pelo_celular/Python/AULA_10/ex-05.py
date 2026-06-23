
'''5-Faça um algoritmo que leia o valor do salário mínimo 
e o valor do salário de um usuário, calcule quantos 
salários mínimos esse usuário ganha e imprima na tela o
resultado. (Base para o Salário mínimo R$ 1293.20)
1.293,20 - 1293.20
'''
#entrada
salario_minimo = float(input("Digite o valor do salário minimo: "))
salario_usuario = float(input("Digite o valor do seu salário: "))

#processamento
quantidade_salarios_minimos = salario_usuario / salario_minimo

#saida
print("Você ganha aproximadamente", quantidade_salarios_minimos, "salários mínimos.")
'''2-Faça um algoritmo que receba dois números e ao final mostre a soma, subtração,
multiplicação e a divisão dos números lidos.'''

num1 = float(input("Digite o primeiro número: "))

num2 = float(input("Digite o segundo número: "))
soma = num1 + num2
print("A soma de", num1, "e", num2, "é igual a", soma)
subtracao = num1 - num2
print("A subtração de", num1, "e", num2, "é igual a", subtracao)
multiplicacao = num1 * num2
print("A multiplicação de", num1, "e", num2, "é igual a", multiplicacao)
if num2 != 0:
    divisao = num1 / num2
    print("A divisão de", num1, "por", num2, "é igual a", divisao)
else:
    print("Não é possível dividir por zero.")
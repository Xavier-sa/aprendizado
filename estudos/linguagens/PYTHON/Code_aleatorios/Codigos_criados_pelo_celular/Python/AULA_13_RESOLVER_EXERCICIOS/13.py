'''
13. A prefeitura de Contagem abriu uma linha de crédito para os funcionários estatutários.
O valor máximo da prestação não poderá ultrapassar 30% do salário bruto. Fazer um
algoritmo que permita entrar com o salário bruto e o valor da prestação, e informar se
o empréstimo pode ou não ser concedido.
'''
#entradas
salario_bruto = float(input("Digite o salário bruto: "))
valor_prestacao = float(input("Digite o valor da prestação: "))
valor_emprestimo = float(input("Digite o valor do emprestimo: "))
qtd_parcelas = float(input("Digite o numero de prestações: "))
#processamento
limite_prestacao = salario_bruto * 0.3
if valor_prestacao <= limite_prestacao:
        print("Empréstimo pode ser concedido.")
else:
        print("Empréstimo não pode ser concedido. O valor da prestação excede 30% do salário bruto.")

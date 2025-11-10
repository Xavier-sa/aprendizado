salario = float(input("Qual é o salario do Funcionário? R$"))
novo = salario + (salario * 7.5/100)
print('Funcionario que ganhava R${:.2f}, com 7.5% de aumento, passa a receber R${:.2f}'.format(salario,novo))



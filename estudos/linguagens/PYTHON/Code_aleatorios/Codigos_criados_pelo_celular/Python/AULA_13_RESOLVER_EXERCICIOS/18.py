'''
18. A escola “APRENDER” faz o pagamento de seus professores por hora/aula. Faça um
algoritmo que calcule e exiba o salário de um professor. Sabe-se que o valor da
hora/aula segue a tabela abaixo:
Professor Nível 1 R$12,00 por hora/aula
Professor Nível 2 R$17,00 por hora/aula
Professor Nível 3 R$25,00 por hora/aula
'''
#entradas
nivel = int(input("Digite o nível do professor (1, 2 ou 3): "))
horas_aula = float(input("Digite a quantidade de horas/aula ministradas pelo professor: "))

#processamento
if nivel == 1:
    valor_hora_aula = 12.00
elif nivel == 2:
    valor_hora_aula = 17.00
elif nivel == 3:
    valor_hora_aula = 25.00
else:
    print("Nível inválido. Por favor, insira um nível válido (1, 2 ou 3).")
    exit()
salario = horas_aula * valor_hora_aula
print(f"O salário do professor é: R$ {salario:.2f}")

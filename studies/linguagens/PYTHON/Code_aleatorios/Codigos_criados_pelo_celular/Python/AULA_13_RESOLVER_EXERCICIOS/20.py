'''
20. Faça um algoritmo que calcule o valor da conta de luz de uma pessoa. Sabe-se que o
cálculo da conta de luz segue a tabela abaixo:
Tipo de Cliente - Valor do KW/h
1 (Residência) - 0,60
2 (Comércio) - 0,48
3 (Indústria) - 1,29
'''
#entrada
tipo_cliente = int(input("Digite o tipo de cliente (1 - Residência, 2 - Comércio, 3 - Indústria): "))
kw_consumidos = float(input("Digite a quantidade de KW/h consumida: "))
#processamento
if tipo_cliente == 1:
    preco_kw_h = 0.60  # Residência

elif tipo_cliente == 2:
    preco_kw_h = 0.48  # Comércio

elif tipo_cliente == 3:
    preco_kw_h = 1.29  # Indústria
    
else:
    print("Tipo de cliente inválido.")
    exit()

valor_conta = kw_consumidos * preco_kw_h
#saida
print(f"O valor da conta de luz é: R$ {valor_conta:.2f}")

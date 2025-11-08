'''12. Elaborar um algoritmo que efetue a apresentação do valor da conversão em real (R$)
de um valor lido em dólar (US$). O algoritmo deverá solicitar o valor da cotação do
dólar e também a quantidade de dólares disponíveis com o usuário.'''

# entrada
def converter_dolar_para_real():
    
    
    cotacao_dolar = float(input("Insira o valor da cotação do dólar em reais: R$ "))

    
    quantidade_dolares = float(input("Insira a quantidade de dólares disponíveis: US$ "))

    #processamento
    valor_real = quantidade_dolares * cotacao_dolar

    # saida
    print(f"A quantidade de US$ {quantidade_dolares:.2f} equivale a R$ {valor_real:.2f}")

# automatizo, inves de deixar manual
converter_dolar_para_real()

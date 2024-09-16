'''17. A padaria Pão&Bão tem um fluxo diário de vendas de pães franceses e broas. Cada
pão é vendido por R$ 0,12 e cada broa por R$ 1,50. No final de cada dia, o
proprietário deseja saber quanto foi arrecadado com a venda total de pães e broas e
quanto ele deve guardar em uma conta poupança, correspondente a 10% desse valor
arrecadado. Para ajudar o proprietário, você foi contratado para fazer os cálculos. Faça
um algoritmo para ler as quantidades de pães e de broas, e depois efetue o cálculo.'''


def calcular_arrecadacao_e_poupanca():
    #entrada
    preco_pao = 0.12
    preco_broa = 1.50
    quantidade_paes = int(input("Insira a quantidade de pães vendidos: "))
    quantidade_broas = int(input("Insira a quantidade de broas vendidas: "))

    #processamento
    valor_paes = quantidade_paes * preco_pao
    valor_broas = quantidade_broas * preco_broa
    valor_total_arrecadado = valor_paes + valor_broas
    valor_poupanca = valor_total_arrecadado * 0.10

    #saida
    print(f"\nValor total arrecadado: R$ {valor_total_arrecadado:.2f}")
    print(f"Valor a ser guardado em uma conta poupança (10% do valor arrecadado): R$ {valor_poupanca:.2f}")


calcular_arrecadacao_e_poupanca()

"""Exemplos iniciais de Python usando coleta de lixo urbana."""


# 1. Saída de dados com print()
print("=" * 50)
print("SISTEMA DE COLETA DE LIXO URBANA")
print("=" * 50)


# 2. Variáveis e tipos de dados
nome_cidade = "Cidade Verde"       # str: texto
numero_bairros = 8                  # int: número inteiro
coleta_ativa = True                 # bool: verdadeiro ou falso
media_diaria_toneladas = 12.5       # float: número decimal

print(f"Cidade atendida: {nome_cidade}")
print(f"Quantidade de bairros: {numero_bairros}")
print(f"Coleta ativa: {coleta_ativa}")
print(f"Média coletada por dia: {media_diaria_toneladas} toneladas")


# 3. Entrada de dados com input()
print("\nCADASTRO DE UMA COLETA")
nome_bairro = input("Digite o nome do bairro: ")

# input() sempre devolve texto. Por isso, convertemos os números.
quantidade_caminhoes = int(input("Digite a quantidade de caminhões: "))
toneladas_por_caminhao = float(
    input("Digite quantas toneladas cada caminhão coletou: ")
)


# 4. Operações matemáticas
total_coletado = quantidade_caminhoes * toneladas_por_caminhao
meta_diaria = 10.0
falta_para_meta = meta_diaria - total_coletado

print("\nRESUMO DA COLETA")
print(f"Bairro: {nome_bairro}")
print(f"Caminhões utilizados: {quantidade_caminhoes}")
print(f"Total coletado: {total_coletado:.2f} toneladas")


# 5. Decisão com if, elif e else
if total_coletado > meta_diaria:
    excedente = total_coletado - meta_diaria
    print(f"Meta superada em {excedente:.2f} toneladas!")
elif total_coletado == meta_diaria:
    print("A meta diária foi atingida exatamente!")
else:
    print(f"Ainda faltam {falta_para_meta:.2f} toneladas para atingir a meta.")


# 6. Lista e repetição com for
tipos_de_residuo = ["orgânico", "reciclável", "vidro", "eletrônico"]

print("\nTIPOS DE RESÍDUOS ATENDIDOS")
for tipo in tipos_de_residuo:
    print(f"- {tipo}")


# 7. Função simples
def mostrar_rota(bairro, caminhoes):
    """Mostra uma mensagem resumida sobre a rota de coleta."""
    print(f"\nA rota do bairro {bairro} utilizará {caminhoes} caminhão(õ).")


mostrar_rota(nome_bairro, quantidade_caminhoes)

print("\nRegistro concluído com sucesso!")

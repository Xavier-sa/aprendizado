import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

# Função para adicionar um preço
def adicionar_preco(df):
    produto = input("Digite o nome do produto: ")
    preco = float(input("Digite o preço do produto: "))
    data = datetime.now().strftime("%Y-%m-%d")
    df = df.append({"Produto": produto, "Preço": preco, "Data": data}, ignore_index=True)
    return df

# Função para salvar os dados em um arquivo CSV
def salvar_dados(df, arquivo='precos_supermercado.csv'):
    df.to_csv(arquivo, index=False)

# Função para carregar os dados de um arquivo CSV
def carregar_dados(arquivo='precos_supermercado.csv'):
    try:
        df = pd.read_csv(arquivo)
    except FileNotFoundError:
        df = pd.DataFrame(columns=["Produto", "Preço", "Data"])
    return df

# Função para gerar gráfico de preços por produto
def gerar_grafico(df):
    df['Data'] = pd.to_datetime(df['Data'])
    produtos = df['Produto'].unique()
    plt.figure(figsize=(10, 6))

    for produto in produtos:
        df_produto = df[df['Produto'] == produto]
        df_produto = df_produto.groupby('Data').mean().reset_index()
        plt.plot(df_produto['Data'], df_produto['Preço'], label=produto)

    plt.xlabel('Data')
    plt.ylabel('Preço')
    plt.title('Preços dos Produtos ao Longo do Tempo')
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# Programa principal
def main():
    df = carregar_dados()

    while True:
        print("1. Adicionar preço")
        print("2. Gerar gráfico de preços")
        print("3. Sair")
        escolha = input("Escolha uma opção: ")

        if escolha == "1":
            df = adicionar_preco(df)
            salvar_dados(df)
        elif escolha == "2":
            gerar_grafico(df)
        elif escolha == "3":
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    main()

import pandas as pd

class colors:
    PURPLE = '\033[95m'
    CYAN = '\033[96m'
    DARKCYAN = '\033[36m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

proporcao = 1.30

valores_base = list(range(50, 1001, 50))
valores_pagos = [round(valor_base * proporcao, 2) for valor_base in valores_base]

df = pd.DataFrame({
    'Valor Base (R$)': valores_base,
    'Valor Pago (R$)': valores_pagos
})

# Função para formatar a saída do DataFrame com cores
def print_colored_df(df):
    # Converte o DataFrame em uma string
    df_str = df.to_string(index=False)
    
    # Adiciona formatação colorida
    # Aplica cores para a primeira linha (cabeçalho)
    header, *rows = df_str.split('\n')
    colored_header = f"{colors.BOLD}{colors.CYAN}{header}{colors.END}"
    
    # Adiciona cor às linhas de dados
    colored_rows = [f"{colors.GREEN}{row}{colors.END}" for row in rows]
    
    # Junta tudo
    colored_df_str = f"{colored_header}\n" + "\n".join(colored_rows)
    
    # Exibe o DataFrame colorido no terminal
    print(colored_df_str)

# Chama a função para exibir o DataFrame com cores
print_colored_df(df)

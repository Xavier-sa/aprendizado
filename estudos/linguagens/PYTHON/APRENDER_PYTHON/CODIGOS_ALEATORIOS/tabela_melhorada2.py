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

def print_colored(df):

    df_str = df.to_string(index=False, header=True, justify='center')
    
    
    lines = df_str.split('\n')
    
    
    header = lines[0]
    border = '+' + '-' * (len(header) + 2) + '+'
    colored_header = f"{colors.RED}{colors.CYAN}{border}\n| {colors.YELLOW}{header}{colors.END} |"
    
    colored_rows = [f"| {colors.GREEN}{row}{colors.END} |" for row in lines[1:]]
    
    
    colored_df_str = f"\n\n\n{colored_header}\t\t\n{border}\n" + "\n".join(colored_rows) + f"\t\t\n{border}"
    
    
    print(colored_df_str)


print_colored(df)

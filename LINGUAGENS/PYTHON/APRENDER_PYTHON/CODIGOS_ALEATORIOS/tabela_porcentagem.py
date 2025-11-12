# import pandas as pd

# valores_base = [50, 100, 150, 200]  # Exemplos de valores base
# valores_pagos = [65, 130, 195, 260]  # Exemplos de valores pagos correspondentes

# df = pd.DataFrame({
#     'Valor Base (R$)': valores_base,
#     'Valor Pago (R$)': valores_pagos
# })

# # Exiba a tabela
# print(df)



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

print(df)

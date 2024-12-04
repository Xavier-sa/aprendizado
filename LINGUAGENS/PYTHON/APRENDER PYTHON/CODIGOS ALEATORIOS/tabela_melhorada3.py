import pandas as pd

proporcao = 1.30

valores_base = list(range(50, 1001, 50))
valores_pagos = [round(valor_base * proporcao, 2) for valor_base in valores_base]

# Cria o DataFrame inicial
df = pd.DataFrame({
    'Valor Base (R$)': valores_base,
    'Valor Pago (R$)': valores_pagos
})

# Determina o parcelamento e o valor de cada parcela
def parcelamento(valor):
    if valor > 500:
        return ('Parcelado em 3x', 3)
    elif valor > 150:
        return ('Parcelado em 2x', 2)
    else:
        return ('À vista', 1)

# Aplica a função de parcelamento ao DataFrame
df[['Parcelamento', 'Número de Parcelas']] = df['Valor Pago (R$)'].apply(parcelamento).apply(pd.Series)

# Calcula o valor de cada parcela
df['Valor por Parcela (R$)'] = df['Valor Pago (R$)'] / df['Número de Parcelas']

# Exibe o DataFrame
print(df)

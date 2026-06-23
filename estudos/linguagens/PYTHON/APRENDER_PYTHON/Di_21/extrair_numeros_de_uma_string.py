import re

# Função para extrair números
def extrair_numeros(texto):
    # Regex para extrair números inteiros
    padrao = r'\d+'
    
    # Usando re.findall para encontrar todos os números
    numeros = re.findall(padrao, texto)
    
    return [int(num) for num in numeros]

# Teste
texto = "Tenho 2 gatos e 3 cachorros, e minha idade é 250 anos."
print(extrair_numeros(texto))

import re

# Função para buscar todas as ocorrências de uma palavra
def buscar_palavra(texto, palavra):
    # Regex para buscar todas as ocorrências de 'palavra'
    padrao = r'\b' + re.escape(palavra) + r'\b'
    
    # Encontrar todas as ocorrências da palavra
    ocorrencias = re.findall(padrao, texto)
    
    return ocorrencias

# Testando
texto = "Este é um exemplo de texto. Este texto contém a palavra exemplo."
# aqui escrevo qual palavra quero:
palavra = "texto"
print(buscar_palavra(texto, palavra))

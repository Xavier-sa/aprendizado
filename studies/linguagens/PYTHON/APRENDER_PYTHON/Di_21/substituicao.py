import re

# Função para substituir palavra no texto
def substituir_palavra(texto, palavra_antiga, palavra_nova):
    # Regex para substituir 'palavra_antiga' por 'palavra_nova'
    padrao = r'\b' + re.escape(palavra_antiga) + r'\b'
    
    # Substituir as ocorrências
    texto_modificado = re.sub(padrao, palavra_nova, texto)
    
    return texto_modificado

# Teste
texto = "O sol brilha no céu. O sol é bonito."
palavra_antiga = "sol"
palavra_nova = "lua-de-mel"
print(substituir_palavra(texto, palavra_antiga, palavra_nova))

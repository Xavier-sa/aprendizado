def contar_palavras(s):
    palavras = s.split()  # Divide a string nas palavras
    return len(palavras)

# Exemplo de uso
print(contar_palavras("Eu amo programação"))  # Output: 3

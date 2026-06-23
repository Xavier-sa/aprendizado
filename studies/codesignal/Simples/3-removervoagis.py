def remover_vogais(s):
    vogais = "aeiouAEIOU"
    resultado = ""
    for char in s:
        if char not in vogais:
            resultado += char
    return resultado

# Exemplo de uso
print(remover_vogais("Olá Mundo"))  # Output: "l Mnd"

def substituir_caracteres(s, antigo, novo):
    resultado = ""
    for char in s:
        if char == antigo:
            resultado += novo
        else:
            resultado += char
    return resultado

# Exemplo de uso
print(substituir_caracteres("Olá Mundo", "o", "0"))  # Output: "0lá Mund0"

def inverter_string(s):
    invertida = ""
    for i in range(len(s) - 1, -1, -1):
        invertida += s[i]
    return invertida

# Exemplo de uso
print(inverter_string("Python"))  # Output: "nohtyP"

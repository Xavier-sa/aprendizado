def verificar_palindromo(string):
    # Etapa 1: Remover espaços e transformar em minúsculas manualmente
    letras = []
    for caractere in string:
        # Verificar se não é espaço
        if caractere != " ":
            # Converter manualmente para minúscula
            # Verificar se é letra maiúscula (entre 'A' e 'Z')
            if 'A' <= caractere <= 'Z':
                # Converter para minúscula somando 32 no código ASCII
                caractere = chr(ord(caractere) + 32)
            letras.append(caractere)
    
    # Etapa 2: Verificar se é palíndromo comparando os extremos
    inicio = 0
    fim = len(letras) - 1
    
    eh_palindromo = True
    while inicio < fim:
        if letras[inicio] != letras[fim]:
            eh_palindromo = False
            break
        inicio += 1
        fim -= 1

    return eh_palindromo


# 🚀 Testes
print(verificar_palindromo("Xavier"))                     # True
print(verificar_palindromo("A base do teto desaba"))     # True
print(verificar_palindromo("palindromo"))                # False

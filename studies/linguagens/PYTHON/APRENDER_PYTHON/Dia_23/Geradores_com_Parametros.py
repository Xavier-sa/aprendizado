def multiplicar(n, limite):
    contador = 1
    while contador <= limite:
        yield n * contador
        contador += 1

# Usando o gerador
for resultado in multiplicar(5, 3):
    print(resultado)

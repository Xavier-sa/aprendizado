def grande_sequencia(limite):
    for i in range(limite):
        yield i

# Usando o gerador com um limite grande
gerador = grande_sequencia(1000000)

# Pegando os primeiros 5 números
for i in range(5):
    print(next(gerador))

def contador():
    yield 1
    yield 2
    yield 3

# Criando o gerador
gen = contador()

# Usando o gerador
print(next(gen))  # Saída: 1
print(next(gen))  # Saída: 2
print(next(gen))  # Saída: 3

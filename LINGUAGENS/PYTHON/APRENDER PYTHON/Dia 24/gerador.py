import time

# Exemplo 1: Gerador Simples
def gerar_numeros(n):
    for i in range(n):
        yield i  # Pausa a execução e retorna o valor de i

# Exemplo 2: Gerador da Sequência de Fibonacci
def fibonacci(limite):
    a, b = 0, 1
    while a <= limite:
        yield a
        a, b = b, a + b  # Calcula o próximo número da sequência

# Exemplo 3: Gerador para Ler Arquivos Grandes (linha por linha)
def ler_linhas_arquivo(nome_arquivo):
    try:
        with open(nome_arquivo, 'r') as arquivo:
            for linha in arquivo:
                yield linha.strip()  # Retorna cada linha sem o caractere de nova linha
    except FileNotFoundError:
        print(f"O arquivo {nome_arquivo} não foi encontrado.")

# Exemplo 4: Gerador Infinito (contador)
def contador_infinito():
    numero = 0
    while True:
        yield numero
        numero += 1

# ---- Usando os Geradores ----

# 1. Gerador Simples
print("Exemplo 1: Gerador Simples")
gerador = gerar_numeros(5)
for numero in gerador:
    print(numero)

print("\n" + "-"*30)

# 2. Gerador da Sequência de Fibonacci
print("Exemplo 2: Gerador Fibonacci")
gerador_fibonacci = fibonacci(100)
for numero in gerador_fibonacci:
    print(numero)

print("\n" + "-"*30)

# 3. Gerador para Ler Arquivos (Comentado porque não temos um arquivo grande)
# Supondo que temos um arquivo 'grande_arquivo.txt', o código abaixo poderia ser usado:
# for linha in ler_linhas_arquivo('grande_arquivo.txt'):
#     print(linha)

# 4. Gerador Infinito (Contador)
print("Exemplo 4: Gerador Infinito")
contador = contador_infinito()
for _ in range(10):  # Imprime os primeiros 10 números
    print(next(contador))


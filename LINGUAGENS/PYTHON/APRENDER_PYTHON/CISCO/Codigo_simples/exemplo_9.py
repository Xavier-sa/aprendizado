# Função para executar a hipótese de Collatz
def collatz(c0):
    etapas = 0  # Contador de etapas
    print("Valores intermediários:")

    while c0 != 1:
        print(c0)  # Imprime o valor atual de c0
        if c0 % 2 == 0:
            c0 = c0 // 2  # c0 é par
        else:
            c0 = 3 * c0 + 1  # c0 é ímpar
        etapas += 1  # Incrementa o contador de etapas

    print(c0)  # Imprime o último valor (que será 1)
    return etapas

# Solicita ao usuário que insira um número natural
numero = int(input("Digite um número natural: "))

# Verifica se o número é válido (diferente de zero)
if numero <= 0:
    print("Por favor, insira um número natural maior que zero.")
else:
    # Chama a função e imprime o número de etapas
    numero_etapas = collatz(numero)
    print(f"Número de etapas para alcançar 1: {numero_etapas}")

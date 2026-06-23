def soma(a, b):
    return a + b

def subtracao(a, b):
    return a - b

def divisao(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

def raiz_quadrada(a):
    if a < 0:
        return "Erro: Raiz quadrada de número negativo!"
    return a ** 0.5

def multiplicacao(a, b):
    return a * b

def menu():
    print("Escolha uma operação:")
    print("1. Soma")
    print("2. Subtração")
    print("3. Divisão")
    print("4. Raiz Quadrada")
    print("5. Multiplicação")
    
    escolha = input("Digite o número da operação desejada: ")
    
    if escolha in ['1', '2', '3', '5']:
        a = float(input("Digite o primeiro número: "))
        b = float(input("Digite o segundo número: "))
        
        if escolha == '1':
            print(f"Resultado: {soma(a, b)}")
        elif escolha == '2':
            print(f"Resultado: {subtracao(a, b)}")
        elif escolha == '3':
            print(f"Resultado: {divisao(a, b)}")
        elif escolha == '5':
            print(f"Resultado: {multiplicacao(a, b)}")
    
    elif escolha == '4':
        a = float(input("Digite o número: "))
        print(f"Resultado: {raiz_quadrada(a)}")
    
    else:
        print("Escolha inválida")

if __name__ == "__main__":
    menu()

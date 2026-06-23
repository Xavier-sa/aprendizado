def somar (a, b):
    return a + b

def subtrair (a, b):
    return a - b

def multiplicar (a, b):
    return a * b

def dividir (a, b):
    if b == 0:
        return "Divisão por zero não é permitida."
    return a / b

def calcular(operacao, a, b):
    if operacao == 'soma':
        return somar(a, b)
    elif operacao == 'subtracao':
        return subtrair(a, b)
    elif operacao == 'multiplicacao':
        return multiplicar(a, b)
    elif operacao == 'divisao':
        return dividir(a, b)
    else:
        return "Operação inválida."   
    print(f"Menu de Operações:")
    print("1. Soma")        
    print("2. Subtração")   
    print("3. Multiplicação")
    print("4. Divisão")
    print("5. Sair")
def main():
    while True:
        print(f"Menu de Operações:")
        print("1. Soma")        
        print("2. Subtração")   
        print("3. Multiplicação")
        print("4. Divisão")
        print("5. Sair")
        
        escolha = input("Escolha uma operação (1-5): ")
        
        if escolha == '5':
            print("Saindo do programa.")
            break
        
        if escolha not in ['1', '2', '3', '4']:
            print("Opção inválida, tente novamente.")
            continue
        
        a = float(input("Digite o primeiro número: "))
        b = float(input("Digite o segundo número: "))
        
        operacao = ''
        if escolha == '1':
            operacao = 'soma'
        elif escolha == '2':
            operacao = 'subtracao'
        elif escolha == '3':
            operacao = 'multiplicacao'
        elif escolha == '4':
            operacao = 'divisao'
        
        resultado = calcular(operacao, a, b)
        print(f"O resultado da {operacao} é: {resultado}")
    
'''
10. Escreva um algoritmo em PORTUGOL
que leia um número e informe se ele é ou não
divisível por 5.
'''
num = int(input('informe um numero: '))

resto = num % 5

match   resto:
    case 0:
        print('é divisivel por 5')
    case _:
        print('não é divisivel por 5')
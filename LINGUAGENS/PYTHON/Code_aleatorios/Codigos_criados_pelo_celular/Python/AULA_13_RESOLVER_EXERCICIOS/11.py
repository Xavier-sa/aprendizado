'''
11. Escreva um algoritmo em PORTUGOL
para determinar 
se um número A é divisível
por um outro número B.
Esses valores devem ser fornecidos pelo usuário.
'''

numA = float(input('MANDA o numero: A:'))
numB = float(input('MANDA o numero: B:'))

numA % numB

resto= numA % numB 
match resto:
        case 0:
            print ('é divisivel por numB:')
        case _:
            print ('não é divisivel por numB:')

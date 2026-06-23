'''
15. Faça um algoritmo que receba o número
 do mês e mostre o mês correspondente. Valide
mês inválido.
''' 

num = int(input('informe um numero: '))

match  (num):
    case 1:
        print('JAN')
    case 2:
        print('FEV')
    case 3:
        print('MAR')
    case 4:
        print('ABR')
    case 5:
        print('MAI')
    case 6:
        print('JUN')
    case 7:
        print('JUL')
    case 8:
        print('AGO')
    case 9:
        print('SET')
    case 10:
        print('OUT')
    case 11:
        print('NOV')
    case 12:
        print('DEZ')
    case _:
        print('MES INVALIDO')



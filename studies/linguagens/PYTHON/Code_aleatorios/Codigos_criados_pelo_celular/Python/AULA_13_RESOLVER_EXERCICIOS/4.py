'''
4-Faça um algoritmo que receba um numero 
e diga se este numero esta no intervalo entre 100 e 200.'''
#entrada
num = int(input("insira um numero: "))
#processamento
if num >= 100 and num <=200:
    print('o numero {} esta entre 100 e 200'.format(num))

else:
    print('o numero nao esta no intervalo')




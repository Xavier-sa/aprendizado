'''
15. Faça um algoritmo que receba o número
 do mês e mostre o mês correspondente. Valide
mês inválido.
''' 

num = int(input('informe um numero:'))

if (num == 1):
    print("JANEIRO!".format(num))

elif (num == 2):
    print("FEV!".format(num))
    
elif (num == 3):
   print('MAR!'.format(num))

elif (num == 4):
    print("ABR!".format(num))

elif (num == 5):
    print("MAI!".format(num))
    
elif (num == 6):
   print('JUN!'.format(num))

elif (num == 7):
    print("JUL!".format(num))
    
elif (num == 8):
    print('AGO!'.format(num))

elif (num == 9):
  print('SET!'.format(num))

elif (num == 10):
    print("OUT!".format(num))
    
elif (num == 11):
  print('NOV!'.format(num))

elif (num == 12):
   print('DEZ!'.format(num))

else:
    print("MES INVALIDO!".format(num))
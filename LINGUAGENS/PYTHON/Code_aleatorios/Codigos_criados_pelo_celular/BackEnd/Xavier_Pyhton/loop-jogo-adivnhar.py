import random

numero_secreto = random.randint(1,10)

while True:
    tentativa = int(input("Adivinhe o NÚMERO entre 1 e 10:"))
    if tentativa == numero_secreto:
        print()
        print('°'*37)
        print("Parabéns!Você acertou na MOSCA!!!")
        print('°'*37)
        break
    else:
        print()
        print('+'*37)
        print("Tente Novamente!")
        print('+'*37)
        print()
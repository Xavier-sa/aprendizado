import random

def jogo_adivinhacao():
    numero_secreto = random.randint(1, 100)
    tentativas = 0
    
    print("Bem-vindo ao jogo de adivinhação!")
    print("Estou pensando em um número entre 1 e 100.")
    
    while True:
        tentativa = int(input("Tente adivinhar: "))
        tentativas += 1
        
        if tentativa < numero_secreto:
            print("Muito baixo!")
        elif tentativa > numero_secreto:
            print("Muito alto!")
        else:
            print(f"Parabéns! Você acertou em {tentativas} tentativas.")
            break

jogo_adivinhacao()
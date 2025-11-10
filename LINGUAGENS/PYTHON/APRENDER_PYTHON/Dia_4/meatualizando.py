lvl = 1
power_damage = lvl * 2
habilidades = "Telecinese"
nome = input("Escolha o nome dos participantes da Arena (Urgan/Magico Negro/outro:\n)").lower()

def iniciarbatalha():
    print('-'*30)
    print("Batalha iniciada")
    print('-'*30)
    

def derrotadeclarada():
    print('-'*30)
    print("Derrota Eminente ainda nao adquiriu Recursos para codificar metodos excelentes!")
    print('-'*30)
    
    
    
while True:
    if nome == "urgan":
        print(f" o Guerreiro invencivel é {nome}")
        iniciarbatalha()
        break
    
    elif nome == "magico negro":
        print(f"o Mestre da magia é {nome}")
        iniciarbatalha()
        break
    
    else:
        print(f"o Participante do Torneio é um ser Morto Vivo! e Imune a Danos de baixo nivel")
        derrotadeclarada()
        break
    
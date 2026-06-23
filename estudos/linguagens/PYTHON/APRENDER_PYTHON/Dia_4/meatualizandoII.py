 #! Aqui pratico sobre o return!

lvl = 1
power_damage = lvl * 2458266
habilidades = "Telecinese"
nome = input("Escolha o nome dos participantes da Arena (Urgan/Magico Negro/Outro):\n").lower()
mensagem= "Você foi completamente derrotado!!!"
def iniciarbatalha():
    return f"{'-'*30}\n Batalha iniciada \n{'-'*30}"
    

def derrotadeclarada():
    return f"'-'*30\n Derrota Eminente ainda nao adquiriu Recursos para codificar metodos excelentes\n'-'*30"
    
def danos_gerados():
    golpe_fatal = lvl + power_damage 
    print(f"Dano Maximo que {nome} pode causar é {golpe_fatal}" )  
    

while True:
    if nome == "urgan":
        print(f" o Guerreiro invencivel é {nome}")
        iniciarbatalha()
        danos_gerados()
        break
    
    elif nome == "magico negro":
        print(f"o Mestre da magia é {nome}")
        iniciarbatalha()
        danos_gerados()
        break
    
    else:
        print(f"\n{'-'*30}\tParticipante do Torneio{'-'*30}\n\n\n\t\t\t\té um ser Morto Vivo!\n\n\t\t\t{mensagem}\n\n{'-'*30}(Imune a Danos de baixo nivel){'-'*25}")
        derrotadeclarada()
        break
    
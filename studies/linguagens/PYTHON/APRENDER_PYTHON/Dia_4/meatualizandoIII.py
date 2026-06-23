 #!contina no teste if elif else!

lvl = int(input("Qual lvl atual se encontra?\n"))
power_damage = lvl * 2458266
habilidades = int(input("Habilidades Disponiveis são:\n1-Voo\n2-Telecinese\n3-Força Bruta\n4-Imortalidade\n"))
nome = input("Escolha o nome dos participantes da Arena (Urgan/Magico Negro/Outro):\n").lower()
mensagem= "Você foi completamente derrotado!!!"

def iniciarbatalha():
    print(f"{'-'*30}\n Batalha iniciada \n{'-'*30}")
    
def descobrindo_lvl():
    if lvl == 1 and habilidades == 1:
        print(f"\nVoo baixo!\nDescrição:apenas flutuar poucos centimentros do chão")
        
    elif lvl == 1 and habilidades == 2:
        print(f"\nTelecine baixo!\nDescrição:apenas levita objetos a poucos centimentros do chão")
        
    elif lvl == 1 and habilidades == 3:
        print(f"\nForça Bruta!\nDescrição:apenas levanta ou empurra os objetos por poucos segundos")
        
    elif lvl == 1 and habilidades == 2:
        print(f"\nImortalidade!\nDescrição: se cura de pequenos ferimentos")
        
    else:
        print("Poderes se anulam ou Sem lvl necessario!")

        

def derrotadeclarada():
    return f"'-'*30\n Derrota Eminente, {mensagem} .Ainda nao adquiriu Recursos, para codificar metodos excelentes\n'-'*30"
    
def danos_gerados():
    golpe_fatal = lvl + power_damage 
    print(f"Dano Maximo que {nome} pode causar é {golpe_fatal}" )  
    

while True:
    if nome == "urgan":
        iniciarbatalha()
        print(f" o Guerreiro invencivel é {nome}")
        danos_gerados()
        descobrindo_lvl()
        break
    
    elif nome == "magico negro":
        iniciarbatalha()
        print(f"o Mestre da magia é {nome}")
        danos_gerados()
        descobrindo_lvl()
        break
    
    else:
        print(f"\n{'-'*30}\tParticipante do Torneio{'-'*30}\n\n\n\t\t\t\té um ser Morto Vivo!\n\n\t\t\t{mensagem}\n\n{'-'*30}(Imune a Danos de baixo nivel){'-'*25}")
        derrotadeclarada()
        break
    
poder_batalha = int(input("Informe o poder de Batalha:\n"))
print('x*50')    

iniciante = "Humano"
avancado = "Android"
lendario =  "Sayajin"


print('x'*50)    

if poder_batalha < 5000:
    print(f" O personagem é um lutador '{iniciante}'")
    print('x'*50)    
    
elif poder_batalha < 10000:
    print(f" O personagem é um lutador '{avancado}'")
    print('x'*50)    
    
else:
    print(f" O personagem é um guerreiro '{lendario}'")
    print('x'*50) 
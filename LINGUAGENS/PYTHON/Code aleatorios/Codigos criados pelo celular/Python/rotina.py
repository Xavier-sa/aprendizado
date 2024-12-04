users = 'xavier'
print("Acordei!")
acorda = float(input("Que horas acordei (5 - 6 - 7 - 8) horas?\n"))

semana={
    "domingo": 0,
    "segunda-feira": 1,
    "terça-feira": 2,
    "quarta-feira": 3,
    "quinta-feira": 4,
    "sexta-feira": 5,
    "sábado": 6
    
    }
    
    
dia_atual = str(input("Que dia é hoje da semana?")).lower()
if dia_atual in semana:
     indice_dia = semana[dia_atual]
     for i in range(indice_dia, 7):
         if i == 0:
             print("Domingo")
         elif i == 1:
             print("Segunda-feira")
         elif i == 2:
             print("Terça-feira")
         elif i == 3:
             print("Quarta-feira")
         elif i == 4:
             print("Quinta-feira")
         elif i == 5:
             print("Sexta-feira")
         elif i == 6:
             print("Sábado")
         else:
             print("Dia da semana inválido.")

print()



while True:
    if acorda == 5:
        print(f"Levantei as {acorda} 0 horas")
        print("Levantei e fui correr!")
        correu = int(input("Quanto tempo em minutos: (10 - 20 - 30)?"))
        while True:
            if correu <= 10:
                flexao = int(input("Qtde de flexão feitas:"))
                print(f"Como {users} correu  {correu} minutos apenas.Fiz:")
             
                 
                if flexao <= 20:
                    print(f"Correu{correu} minutos e {flexao} flexões \n 1% mais proximo do obejtivo")
                    break
                    
                else:
                    print("continue")
                    break
                    
            elif correu <= 20:
                   print("Faça apenas 5 flexões!")
                   break
                   
            elif correu <= 30:
                   print("Excelente, 'Proximo lvl desbloqueado'")
                   break
                 
            elif correu >= 30:
                   print("Objetivo concluido")
                   break 
                
    elif acorda == 6:
        print("Levanta e vai fazer flexão!")
        break
        
    elif acorda == 7:
        print("Levanta e vai fazer flexão!")
        break
        
    elif acorda == 8:
        print("Levanta e vai fazer 50 -flexoes, 10 -barras, 30 abdominais!")
        break
        
        
    else:
        print(f'Melhore o codigo sem usar nada complexo\n\n\nSe esta mensagem estiver aparecendo deixei brechas no meu codigo!')
        break
print('-'*10)        
print(f"Funciona") 
print('-'*10)







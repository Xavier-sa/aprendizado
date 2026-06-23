users = 'xavier'
print("Acordei!")
acorda = float(input("Que horas acordei (5 - 6 - 7 - 8) horas?\n"))

semana = {
    "domingo": 0,
    "segunda-feira": 1,
    "terça-feira": 2,
    "quarta-feira": 3,
    "quinta-feira": 4,
    "sexta-feira": 5,
    "sábado": 6
}

dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]

dia_atual = str(input("Que dia é hoje da semana?")).lower()
if dia_atual in dias:
    indice_dia = semana[dia_atual]
    for i in range(indice_dia, 7):
        print(dias[i])
else:
    print("Dia da semana inválido.")

print()

if acorda == 5:
    print(f"Levantei às {acorda} horas")
    print("Levantei e fui correr!")
    correu = int(input("Quanto tempo em minutos: (10 - 20 - 30)?"))
    if correu <= 10:
        flexao = int(input("Quantidade de flexões feitas: "))
        print(f"Como {users} correu {correu} minutos apenas. Fiz:")
        if flexao <= 20:
            print(f"Correu {correu} minutos e fez {flexao} flexões. 1% mais próximo do objetivo.")
        else:
            print("Continue")
    elif correu <= 20:
        print("Faça apenas 5 flexões!")
    elif correu <= 30:
        print("Excelente, próximo nível desbloqueado!")
    else:
        print("Objetivo concluído!")
elif acorda in [6, 7]:
    print("Levanta e vai fazer flexão!")
elif acorda == 8:
    print("Levanta e vai fazer 50 flexões, 10 barras, 30 abdominais!")
else:
    print("Melhore o código sem usar nada complexo.\nSe esta mensagem estiver aparecendo, deixei brechas no meu código!")

print('-' * 10)
print("Funciona")
print('-' * 10)

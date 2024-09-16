'''
19. Elabore um algoritmo que, dada a idade de um nadador. Classifique-o em uma das
seguintes categorias:
Infantil A = 5 - 7 anos
Infantil B = 8 - 10 anos
Juvenil A = 11- 13 anos
Juvenil B = 14 - 17 anos
Sênior = 18 - 25 anos
Apresentar mensagem “idade fora da faixa etária” quando for outro ano não
contemplado.
'''
#entrada
idade = int(input("Informe a idade do nadador: "))
#processamento
if 5 <= idade <= 7:
    print("Infantil A")
elif 8 <= idade <= 10:
    print("Infantil B")
elif 11 <= idade <= 13:
    print("Juvenil A")
elif 14 <= idade <= 17:
    print("Juvenil B")
elif 18 <= idade <= 25:
    print("Sênior")
else:
    print("Idade fora da faixa etária")

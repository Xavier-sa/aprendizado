def converter_para_12h(horas,minutos):
    if hotas >= 0 and horas <= 12:
        periodo='A'
        if horas == 0:
            horas = 12
    else:
        periodo='P'
        if horas != 12:
            horas -=12
    return horas,minutos,periodo 
print('Xavier foi')


hora = int(input("Horas em 24h:"))

hora.converter_para_12h()

print(hora)
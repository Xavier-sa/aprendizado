def ler_horas():
    while True:
        try:
            horas=int(input('informe as horas:'))
            validar_(horas)
            return horas
        except ValueError as e:
            print('Erro: {e}')


def checa_valor(valor):
    if valor < 0:
        raise ExcecaoCustomizada("Valor não pode ser negativo!")

try:
    checa_valor(-10)
except ExcecaoCustomizada as ex:
    print(f"Exceção lançada: {ex}") 
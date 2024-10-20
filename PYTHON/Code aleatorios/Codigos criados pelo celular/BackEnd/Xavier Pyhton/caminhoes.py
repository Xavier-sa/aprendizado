frase1 = "Hello, World!\nBem vindo!\n\tXavier,\nO que você deseja fazer hoje?"
print(frase1)


portao = input("Situação do portão:\nAberto(True) Fechado(False):").strip()


if portao == 'True':
    frase2 = 'Está aberto!'
    print(frase2)
else:
    frase3 = 'Está fechado!'    
    print(frase3)
    

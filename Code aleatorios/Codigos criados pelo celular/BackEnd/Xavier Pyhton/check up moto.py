toDoList = [
{"Piscas Funcionando":True},
{"Moto esta Abastecida":        True},
{"Pneus calibrados":True},
{"Freios funcionando":True},
{"Chaves de manutenção":False},
{"Pneus em condições":True}    
    
    ]
    
for item in toDoList:
    for chave,valor in item.items():
        if valor == False:
            print(f'{chave}\t[ ]')
        else:
            print(f'{chave}\t[x]')


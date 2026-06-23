vehicles_one = ['carro', 'bicicleta', 'motor']
print(vehicles_one) # outputs: ['carro', 'bicicleta', 'motor']
 
vehicles_two = vehicles_one
del vehicles_one[0] # exclui 'carro'
print(vehicles_two) # outputs: ['bicicleta', 'motor']
 

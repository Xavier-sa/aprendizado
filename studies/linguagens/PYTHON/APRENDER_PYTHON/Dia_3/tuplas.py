 #! "Criando uma tupla"
coordenadas = (10, 20)
print(coordenadas)  # Output: (10, 20)


print('x'*50)
#! Acessar um elemento pelo índice
print(coordenadas[0])  # Output: 10


#?"Acessar Elementos:"
#!Acessar um intervalo de elementos (fatiamento)
print(coordenadas[1:])  # Output: (20,)
print(coordenadas[:1])  # Output: (10,)
print('x'*50)

print('x'*50)
#?"Desempacotar Tuplas, Você pode desempacotar uma tupla em variáveis individuais:"
x, y = coordenadas
print(f"x: {x}, y: {y}")  # Output: x: 10, y: 20
print('x'*50)


print('x'*50)
#! Criar uma nova tupla com base na existente

#?"Modificar Tuplas (indiretamente) Embora você não possa modificar uma tupla diretamente, você pode criar uma nova tupla com base na existente:
nova_coordenada = coordenadas + (30,)  # Adiciona um novo elemento
print(nova_coordenada)  # Output: (10, 20, 30)

#! Repetir elementos
repetida = coordenadas * 2
print(repetida)  # Output: (10, 20, 10, 20)
print('x'*50)

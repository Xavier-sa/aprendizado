 #! Criando uma lista
frutas = ["maçã", "banana", "laranja"]
print(frutas)  #! Output: ['maçã', 'banana', 'laranja']


print('-'*30)

#? Adicionar um elemento ao final da lista
frutas.append("uva")
print(frutas)  #? Output: ['maçã', 'banana', 'laranja', 'uva']


print('-'*30)

print('-'*30)

#! Adicionar um elemento em uma posição específica
frutas.insert(1, "manga")  # Adiciona "manga" na posição 1
print(frutas)  # Output: ['maçã', 'manga', 'banana', 'laranja', 'uva']

print('-'*30)

#! Remover um elemento específico
frutas.remove("banana")
print(frutas)  # Output: ['maçã', 'manga', 'laranja', 'uva']


print('-'*30)

#! Remover o último elemento
fruta_removida = frutas.pop()
print(frutas)  # Output: ['maçã', 'manga', 'laranja']
print(f"Fruta removida: {fruta_removida}")  # Output: Fruta removida: uva

print('-'*30)


#! Remover um elemento em uma posição específica
elemento = frutas.pop(1)
print(frutas)  # Output: ['maçã', 'laranja']
print(f"Elemento removido: {elemento}")  # Output: Elemento removido: manga

print('-'*30)

#! Acessar um elemento pelo índice
print(frutas[0])  # Output: maçã

print('-'*30)

#! Acessar um intervalo de elementos (fatiamento)
print(frutas[1:])  # Output: ['laranja']
print(frutas[:2])  # Output: ['maçã', 'laranja']

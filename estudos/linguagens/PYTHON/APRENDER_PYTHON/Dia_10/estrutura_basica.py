'''Exemplos
Exemplo 1: Quadrados dos números
Usando loop tradicional:
'''
squares = []
for i in range(10):
    squares.append(i * i)
print(squares)    
#?Usando list comprehension:

squares = [i * i for i in range(10)]

'''Exemplo 2: Filtrar números pares
Usando loop tradicional:'''


evens = []
for i in range(10):
    if i % 2 == 0:
        evens.append(i)
        
print(evens)
#?Usando list comprehension:


evens = [i for i in range(10) if i % 2 == 0]
print(evens)

'''Exemplo 3: Aplicar uma função a cada item
Usando loop tradicional:'''


words = ['hello', 'world', 'python']
uppercase_words = []
for word in words:
    uppercase_words.append(word.upper())
    
print(words)
    
#?Usando list comprehension:

uppercase_words = [word.upper() for word in words]

print(uppercase_words)
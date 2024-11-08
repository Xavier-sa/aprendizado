# Lista de listas
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Compreensão com condição para filtrar apenas números pares
even_numbers = [item for sublist in nested_list for item in sublist if item % 2 == 0]

print(even_numbers)

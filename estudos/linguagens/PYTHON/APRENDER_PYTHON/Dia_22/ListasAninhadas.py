# Lista de listas
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Compreensão de lista aninhada para extrair todos os números
flat_list = [item for sublist in nested_list for item in sublist]

print(flat_list)

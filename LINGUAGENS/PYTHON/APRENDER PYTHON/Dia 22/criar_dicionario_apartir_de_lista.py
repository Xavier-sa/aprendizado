keys = ['a', 'b', 'c']
values = [1, 2, 3]

# Compreensão de dicionário para criar um dicionário a partir de duas listas
my_dict = {keys[i]: values[i] for i in range(len(keys))}

print(my_dict)

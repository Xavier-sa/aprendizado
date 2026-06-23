# Lista de números
numbers = [1, 2, 3, 4, 5, 6, 7, 8]

# Compreensão de set para pegar apenas os ímpares
odd_numbers = {num for num in numbers if num % 2 != 0}

print(odd_numbers)

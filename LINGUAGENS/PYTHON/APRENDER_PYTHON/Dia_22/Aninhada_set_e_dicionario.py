words = ['apple', 'banana', 'cherry', 'date']

# Compreensão de dicionário aninhado para contar a ocorrência de cada letra
char_count = {char: sum(word.count(char) for word in words) for char in set(''.join(words))}

print(char_count)

# Métodos de strings em Python

string = "python programming"

print(string.capitalize())  # Converte o primeiro caractere para maiúsculo
print(string.casefold())    # Converte a string para minúsculo, mais agressivo que lower()
print(string.center(30))    # Retorna a string centralizada em um espaço de 30 caracteres
print(string.count('p'))    # Retorna o número de vezes que 'p' aparece na string
print(string.encode())      # Retorna a versão codificada da string
print(string.endswith('ing'))  # Retorna True se a string termina com 'ing'
print("Python\tProgram".expandtabs(10))  # Define o tamanho da tabulação como 10
print(string.find('prog'))  # Procura 'prog' e retorna a posição de onde foi encontrado
print("Hello, {}!".format('Wellington'))  # Formata valores especificados em uma string
print("{name}!".format_map({'name': 'Wellington'}))  # Formata valores de um dicionário
print(string.index('prog'))  # Procura 'prog' e retorna a posição de onde foi encontrado
print("Python3".isalnum())   # Retorna True se todos os caracteres forem alfanuméricos
print("Python".isalpha())    # Retorna True se todos os caracteres forem letras
print("©".isascii())         # Retorna True se todos os caracteres forem ASCII
print("1234".isdecimal())    # Retorna True se todos os caracteres forem decimais
print("1234".isdigit())      # Retorna True se todos os caracteres forem dígitos
print("var_name".isidentifier())  # Retorna True se for um identificador válido
print("python".islower())    # Retorna True se todos os caracteres forem minúsculos
print("12345".isnumeric())   # Retorna True se todos os caracteres forem numéricos
print("Hello!".isprintable())  # Retorna True se todos os caracteres forem imprimíveis
print("   ".isspace())       # Retorna True se todos os caracteres forem espaços
print("Python Programming".istitle())  # Retorna True se estiver formatado como título
print("PYTHON".isupper())    # Retorna True se todos os caracteres forem maiúsculos
print(", ".join(['Python', 'Java']))  # Junta elementos do iterável com a string
print(string.ljust(20, '-')) # Retorna uma versão justificada à esquerda
print(string.lower())        # Converte a string para minúsculo
print("    Python".lstrip())  # Remove espaços em branco à esquerda
print(str.maketrans('p', 'P'))  # Retorna uma tabela de tradução
print(string.partition(' ')) # Retorna uma tupla dividindo em três partes
print(string.replace('python', 'Java'))  # Substitui uma substring por outra
print(string.rfind('p'))     # Procura a última ocorrência de 'p'
print(string.rindex('p'))    # Retorna a posição da última ocorrência de 'p'
print(string.rjust(20, '-')) # Retorna uma versão justificada à direita
print(string.rpartition(' ')) # Particiona da direita para a esquerda
print("Python,Java,C".rsplit(','))  # Divide a string pelo separador, da direita
print("Python  ".rstrip())   # Remove espaços em branco à direita
print("Python is cool".split())  # Divide a string pelo separador (padrão: espaço)
print("Line1\nLine2".splitlines())  # Divide a string em linhas
print(string.startswith('py'))  # Retorna True se a string começar com 'py'
print("  Python  ".strip())     # Remove espaços em branco dos dois lados
print(string.swapcase())        # Troca as maiúsculas por minúsculas e vice-versa
print("python programming".title())  # Converte a primeira letra de cada palavra para maiúscula
print("Python".translate(str.maketrans('P', 'p')))  # Substitui caracteres com base na tabela
print(string.upper())          # Converte a string para maiúsculo
print("123".zfill(5))          # Preenche com zeros à esquerda até o tamanho especificado

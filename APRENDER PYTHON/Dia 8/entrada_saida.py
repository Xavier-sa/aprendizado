""" ' r' : Leitura.
    ' w' : Escrita (substitui o conteúdo existente ou cria um novo arquivo).
    ' a' : Anexar (adiciona ao final do arquivo existente).
    ' r+': Leitura e escrita (não substitui o conteúdo existente).
"""


arquivo_entrada = 'entrada.txt'
arquivo_saida = 'saida.txt'


with open(arquivo_entrada, 'w') as file:
    file.write("Olá, este é um arquivo de entrada.\nVamos aprender a ler e escrever arquivos em Python.")


with open(arquivo_entrada, 'r') as file:
    conteudo = file.read()


with open(arquivo_saida, 'w') as file:
    file.write(conteudo)

print(f"Conteúdo do arquivo '{arquivo_entrada}' foi copiado para '{arquivo_saida}'.")

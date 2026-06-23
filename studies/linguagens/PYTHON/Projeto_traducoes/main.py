from Dicionario import *

dicionario = Dicionario()

# Adicionar palavras
dicionario.adicionar_palavra("apple")
dicionario.adicionar_palavra("dog")

# Adicionar traduções
dicionario.adicionar_traducao("apple", "maçã")
dicionario.adicionar_traducao("dog", "cachorro")

# Adicionar frases
dicionario.adicionar_frase("I have an apple", "apple")
dicionario.adicionar_frase("The dog is running", "dog")

# Buscar traduções e frases
print(dicionario.buscar_traducoes("apple"))
print(dicionario.buscar_frases("apple"))

# Fechar a conexão
dicionario.fechar_conexao()
# Nomes dos arquivos
arquivo_entrada = 'Xavier.txt'
arquivo_saida = 'X-man.txt'

with open(arquivo_entrada, 'r') as file:
    conteudo = file.read()

with open(arquivo_saida, 'w') as file:
    file.write(conteudo)

print("Conteúdo copiado com sucesso!")

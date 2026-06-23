def ler_arquivo_em_partes(nome_arquivo):
    with open(nome_arquivo, 'r') as f:
        for linha in f:
            yield linha.strip()

# Exemplo de uso
for linha in ler_arquivo_em_partes('grande_arquivo.txt'):
    print(linha)

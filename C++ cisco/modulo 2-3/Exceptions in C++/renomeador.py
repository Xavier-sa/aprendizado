import os

pasta_js = r'C:\Users\Pichau\aprendizado\aprender C+ cisco\modulo 2-3\Exceptions in C++'  # Usando raw string para o caminho
prefixo = 'exemplo-'  
contador = 1  

for arquivo in os.listdir(pasta_js):
    # Verifica se o arquivo tem a extensão .cpp
    if arquivo.lower().endswith('.cpp'):
        caminho_antigo = os.path.join(pasta_js, arquivo)
        
        # Define o novo nome, mantendo a extensão .cpp
        novo_nome = f"{prefixo}{contador}.cpp"  
        caminho_novo = os.path.join(pasta_js, novo_nome)
        
        os.rename(caminho_antigo, caminho_novo)
        
        print(f'Renomeado: {arquivo} para {novo_nome}')
        contador += 1


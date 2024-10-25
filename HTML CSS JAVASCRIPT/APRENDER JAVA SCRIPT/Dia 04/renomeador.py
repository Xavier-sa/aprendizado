import os

pasta_js = 'HTML CSS JAVASCRIPT/APRENDER JAVA SCRIPT/Dia 04'  # Mantenha o nome da pasta onde estão os arquivos .js

prefixo = 'exemplos_'  
contador = 1  

for arquivo in os.listdir(pasta_js):
    # Verifica se o arquivo tem a extensão .js
    if arquivo.lower().endswith('.js'):
        caminho_antigo = os.path.join(pasta_js, arquivo)
        
        # Define o novo nome, mantendo a extensão .js
        novo_nome = f"{prefixo}{contador}.js"  
        caminho_novo = os.path.join(pasta_js, novo_nome)
        
        os.rename(caminho_antigo, caminho_novo)
        
        print(f'Renomeado: {arquivo} para {novo_nome}')
        contador += 1

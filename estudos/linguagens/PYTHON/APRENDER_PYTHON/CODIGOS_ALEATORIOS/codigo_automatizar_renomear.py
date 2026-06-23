import os


pasta_imagens = 'assets'


prefixo = 'porta_img'  
contador = 1  


for arquivo in os.listdir(pasta_imagens):
    
    if arquivo.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
       
        caminho_antigo = os.path.join(pasta_imagens, arquivo)
        
       
        novo_nome = f"{prefixo}{contador}.jpg"  
        caminho_novo = os.path.join(pasta_imagens, novo_nome)
        
       
        os.rename(caminho_antigo, caminho_novo)
        
        print(f'Renomeado: {arquivo} para {novo_nome}')
        contador += 1

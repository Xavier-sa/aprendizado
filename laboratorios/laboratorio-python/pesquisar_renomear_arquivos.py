import os

# Caminho para a pasta do repositório local
repo_path = 'C:/Users/Pichau/aprendizado'

# Função para verificar e renomear o arquivo com o espaço
def renomear_index_arquivo(caminho_pasta):
    # Percorre todas as pastas e subpastas dentro do diretório
    for root, dirs, files in os.walk(caminho_pasta):
        print(f'Analisando pasta: {root}')  # Mensagem de depuração para ver qual pasta está sendo analisada
        
        # Verifica todos os arquivos dentro de cada pasta
        for file_name in files:
            print(f'  Encontrado arquivo: {file_name}')  # Mensagem de depuração para ver os arquivos encontrados
            
            # Verifique se o arquivo se chama 'Index ' (com o espaço extra)
            if file_name == 'Index ':
                # Caminho completo do arquivo com espaço
                old_file_path = os.path.join(root, file_name)
                
                # Novo nome para o arquivo sem o espaço
                new_file_path = os.path.join(root, 'Index')
                
                # Renomear o arquivo
                os.rename(old_file_path, new_file_path)
                print(f'Arquivo renomeado: {old_file_path} -> {new_file_path}')
                return True  # Retorna True quando encontrar e renomear o arquivo
    
    return False  # Retorna False se não encontrar o arquivo

# Chama a função para verificar e renomear o arquivo
if renomear_index_arquivo(repo_path):
    print("Arquivo renomeado com sucesso.")
else:
    print("Arquivo 'Index ' não encontrado.")

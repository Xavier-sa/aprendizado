import os

# Caminho para a pasta do repositório local
repo_path = 'C:/Users/USER/Documents/RASCUNHO_DOS_GITS/aprendizado'

# Função para renomear arquivos com espaços nos nomes
def corrigir_nomes_arquivos(caminho_pasta):
    for root, dirs, files in os.walk(caminho_pasta):
        print(f'Analisando pasta: {root}')  # Mensagem de depuração para ver qual pasta está sendo analisada
        
        # Verifica todos os arquivos dentro de cada pasta
        for file_name in files:
            if ' ' in file_name:  # Verifica se há espaços no nome do arquivo
                old_file_path = os.path.join(root, file_name)
                new_file_name = file_name.replace(' ', '_')  # Substitui espaços por underscores (_)
                new_file_path = os.path.join(root, new_file_name)
                
                try:
                    os.rename(old_file_path, new_file_path)
                    print(f'Arquivo renomeado: {old_file_path} -> {new_file_path}')
                except Exception as e:
                    print(f'Erro ao renomear {old_file_path}: {e}')

# Chama a função para corrigir os nomes dos arquivos
corrigir_nomes_arquivos(repo_path)

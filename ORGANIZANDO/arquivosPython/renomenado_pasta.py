import os

# Caminho para a pasta do repositório local
repo_path = 'C:/Users/USER/Documents/RASCUNHO_DOS_GITS/aprendizado'

def renomear_itens(caminho_base):
    # Primeiro renomeamos pastas de baixo para cima (para evitar problemas)
    for root, dirs, files in os.walk(caminho_base, topdown=False):
        
        # Renomear arquivos
        for file_name in files:
            if ' ' in file_name:
                old_path = os.path.join(root, file_name)
                new_name = file_name.replace(' ', '_')
                new_path = os.path.join(root, new_name)

                try:
                    os.rename(old_path, new_path)
                    print(f'[ARQUIVO] {old_path}  ->  {new_path}')
                except Exception as e:
                    print(f'Erro ao renomear arquivo {old_path}: {e}')

        # Renomear pastas
        for dir_name in dirs:
            if ' ' in dir_name:
                old_path = os.path.join(root, dir_name)
                new_name = dir_name.replace(' ', '_')
                new_path = os.path.join(root, new_name)

                try:
                    os.rename(old_path, new_path)
                    print(f'[PASTA]   {old_path}  ->  {new_path}')
                except Exception as e:
                    print(f'Erro ao renomear pasta {old_path}: {e}')


# Executa
renomear_itens(repo_path)

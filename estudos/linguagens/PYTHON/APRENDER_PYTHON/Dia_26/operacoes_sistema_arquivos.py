import os

# 1. Listar arquivos e diretórios em um diretório específico
# O método os.listdir() lista todos os arquivos e diretórios dentro de um diretório.
# O parâmetro '.' indica o diretório atual.
print("Listando arquivos no diretório atual:")
arquivos = os.listdir('.')
for arquivo in arquivos:
    print(arquivo)

print("\n" + "-"*30)

# 2. Criar diretórios
# O método os.mkdir() cria um único diretório. Caso o diretório já exista, ele gerará uma exceção.
# O método os.makedirs() cria múltiplos diretórios de uma vez. Ele cria todos os diretórios intermediários necessários.
# Aqui vamos criar ambos os tipos de diretórios.
if not os.path.exists('novo_diretorio'):
    os.mkdir('novo_diretorio')
    print("Diretório 'novo_diretorio' criado.")
else:
    print("O diretório 'novo_diretorio' já existe.")

# Cria múltiplos diretórios de uma vez (caso não existam).
if not os.path.exists('diretorio/pasta/mais_pastas'):
    os.makedirs('diretorio/pasta/mais_pastas')
    print("Diretórios múltiplos 'diretorio/pasta/mais_pastas' criados.")
else:
    print("Os diretórios já existem.")

print("\n" + "-"*30)

# 3. Remover arquivos e diretórios
# O método os.remove() é utilizado para remover um arquivo.
# O método os.rmdir() é utilizado para remover um diretório vazio.
# No caso de um arquivo temporário, vamos primeiro criar e depois removê-lo.
arquivo_temp = 'arquivo_temp.txt'
with open(arquivo_temp, 'w') as f:
    f.write("Este é um arquivo temporário.")
    
if os.path.exists(arquivo_temp):
    os.remove(arquivo_temp)  # Remove o arquivo
    print(f"Arquivo '{arquivo_temp}' removido.")
else:
    print(f"Arquivo '{arquivo_temp}' não encontrado.")

# Remover um diretório (somente se estiver vazio).
if os.path.exists('novo_diretorio'):
    os.rmdir('novo_diretorio')  # Remove o diretório vazio
    print("Diretório 'novo_diretorio' removido.")
else:
    print("O diretório 'novo_diretorio' não existe ou não está vazio.")

print("\n" + "-"*30)

# 4. Renomear arquivos ou diretórios
# O método os.rename() pode ser usado para renomear arquivos ou diretórios.
# Neste exemplo, vamos renomear o diretório 'pasta' para 'pasta_renomeada'.
if os.path.exists('diretorio/pasta'):
    os.rename('diretorio/pasta', 'diretorio/pasta_renomeada')
    print("Diretório 'pasta' renomeado para 'pasta_renomeada'.")
else:
    print("O diretório 'pasta' não existe.")

print("\n" + "-"*30)

# 5. Verificar se um arquivo ou diretório existe
# O método os.path.exists() retorna True se o caminho fornecido existir.
# Vamos verificar se o diretório renomeado existe.
if os.path.exists('diretorio/pasta_renomeada'):
    print("O diretório 'diretorio/pasta_renomeada' existe.")
else:
    print("O diretório 'diretorio/pasta_renomeada' não existe.")

# 6. Obter informações sobre um arquivo
# O método os.path.getsize() retorna o tamanho do arquivo em bytes.
# Vamos verificar o tamanho do diretório renomeado.
arquivo_info = 'diretorio/pasta_renomeada'
if os.path.exists(arquivo_info):
    print(f"Tamanho do diretório '{arquivo_info}': {os.path.getsize(arquivo_info)} bytes")
else:
    print(f"O diretório '{arquivo_info}' não existe.")

print("\n" + "-"*30)

# 7. Navegar entre diretórios
# O método os.chdir() altera o diretório de trabalho atual.
# O método os.getcwd() retorna o diretório de trabalho atual.
# Aqui vamos mudar para o diretório 'diretorio/pasta_renomeada'.
os.chdir('diretorio/pasta_renomeada')
print(f"Diretório atual após chdir: {os.getcwd()}")

# 8. Juntar caminhos de arquivos de forma portátil
# O método os.path.join() permite criar caminhos de arquivos de forma segura,
# independentemente do sistema operacional.
caminho_completo = os.path.join('diretorio', 'pasta_renomeada', 'novo_arquivo.txt')
print(f"Caminho completo do arquivo: {caminho_completo}")

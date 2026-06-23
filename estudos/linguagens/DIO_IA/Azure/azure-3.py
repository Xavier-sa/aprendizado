# Recebe a entrada do usuário e armazena na variável "entrada"
entrada = input()

# Função responsável por receber um conceito e retornar sua respectiva descrição.
def descrever_conceito(conceito):
    if conceito == "Throughput":
        return "Mede a capacidade de processamento em RUs"
        
    # Preenchendo com os conceitos e suas descrições
    elif conceito == "Database":
        return "Agrupa contêineres com throughput compartilhado ou dedicado"
        
    elif conceito == "Partition Key":
        return "Chave usada para distribuir dados entre partições"
        
    elif conceito == "Container":
        return "Unidade de armazenamento e execução de consultas no Cosmos DB"

# Imprime a descrição do conceito recebido na "entrada" através da função "descrever_conceito". 
print(descrever_conceito(entrada))

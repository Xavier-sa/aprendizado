# Recebe a entrada do usuário e armazena na variável "entrada"
entrada = input()

# Função responsável por receber um conceito e retornar sua respectiva descrição.
def descrever_conceito(conceito):
    if conceito == "Access Tier":
        return "Nível de acesso que define a frequência de acesso aos dados"

    # Preenchendo com os conceitos e suas descrições
    elif conceito == "Container":
        return "Agrupamento de Blobs"
        
    elif conceito == "Storage Account":
        return "Conta que gerencia os serviços de armazenamento"
        
    elif conceito == "Blob":
        return "Unidade de armazenamento de dados no Azure"

# Imprime a descrição do conceito recebido na "entrada" através da função "descrever_conceito". 
print(descrever_conceito(entrada))

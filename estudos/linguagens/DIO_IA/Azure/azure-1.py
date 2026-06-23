# Recebe a entrada do usuário e armazena na variável "entrada"
entrada = input()

# Função responsável por receber um conceito e retornar sua respectiva descrição.
def descrever_conceito(conceito):
  if conceito == "Azure Blob Storage":
    return "Serviço de armazenamento de objetos para dados não estruturados"
  
  # Preenchendo com os conceitos e suas descrições
  elif conceito == "Azure Cosmos DB":
    return "Banco de dados NoSQL distribuído globalmente"

  elif conceito == "Azure Table Storage":
    return "Serviço de armazenamento de dados NoSQL baseado em tabelas"

  elif conceito == "Azure SQL Database":
    return "Banco de dados relacional gerenciado"

# Imprime a descrição do conceito recebido na "entrada" através da função "descrever_conceito". 
print(descrever_conceito(entrada))

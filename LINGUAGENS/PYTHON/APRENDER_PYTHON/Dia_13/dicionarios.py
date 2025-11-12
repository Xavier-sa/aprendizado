# Dicionário inicial com informações sobre alguns personagens de Dragon Ball Z
personagens = {
    "Goku": {"poder": 9000, "planeta": "Terra"},
    "Vegeta": {"poder": 8500, "planeta": "Terra"},
    "Frieza": {"poder": 12000, "planeta": "Nomek"},
    "Cell": {"poder": 10000, "planeta": "Terra"},
}

# Função para adicionar um novo personagem
def adicionar_personagem(nome, poder, planeta):
    personagens[nome] = {"poder": poder, "planeta": planeta}
    print(f'\nPersonagem "{nome}" adicionado com sucesso.')

# Função para atualizar o poder de um personagem existente
def atualizar_poder(nome, novo_poder):
    if nome in personagens:
        personagens[nome]["poder"] = novo_poder
        print(f'\nPoder do personagem "{nome}" atualizado para {novo_poder}.')
    else:
        print(f'\nErro: O personagem "{nome}" não foi encontrado.')

# Função para remover um personagem
def remover_personagem(nome):
    if nome in personagens:
        del personagens[nome]
        print(f'\nPersonagem "{nome}" removido com sucesso.')
    else:
        print(f'\nErro: O personagem "{nome}" não foi encontrado.')

# Função para buscar e mostrar informações de um personagem
def buscar_personagem(nome):
    if nome in personagens:
        info = personagens[nome]
        print(f'\nPersonagem: {nome}, Poder: {info["poder"]}, Planeta: {info["planeta"]}')
    else:
        print(f'\nErro: O personagem "{nome}" não foi encontrado.')

# Função principal para testar as operações com dicionários
if __name__ == "__main__":
    # Mostrar todos os personagens
    print("Personagens atuais:")
    for nome, info in personagens.items():
        print(f'\n{nome}: Poder: {info["poder"]}, Planeta: {info["planeta"]}')
    
    # Adicionar um novo personagem
    adicionar_personagem("Majin Buu", 11000, "Terra")

    # Atualizar o poder de um personagem existente
    atualizar_poder("Vegeta", 9000)

    # Remover um personagem
    remover_personagem("Cell")

    # Buscar e mostrar informações de um personagem
    buscar_personagem("Goku")
    buscar_personagem("Cell")  # Personagem removido, deve gerar um erro

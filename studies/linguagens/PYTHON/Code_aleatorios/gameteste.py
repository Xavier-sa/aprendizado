# Lista de inimigos e suas distâncias predefinidas
inimigos = [
    {"nome": "Inimigo 1", "distancia": 6},
    {"nome": "Inimigo 2", "distancia": 3},
    {"nome": "Inimigo 3", "distancia": 10},
    {"nome": "Inimigo 4", "distancia": 2},
    {"nome": "Inimigo 5", "distancia": 4},
    {"nome": "Inimigo 6", "distancia": 7},
    {"nome": "Inimigo 7", "distancia": 1},
    {"nome": "Inimigo 8", "distancia": 8},
    {"nome": "Inimigo 9", "distancia": 5},
    {"nome": "Inimigo 10", "distancia": 12},
    {"nome": "Inimigo 11", "distancia": 3},
    {"nome": "Inimigo 12", "distancia": 6},
    {"nome": "Inimigo 13", "distancia": 2},
    {"nome": "Inimigo 14", "distancia": 9},
    {"nome": "Inimigo 15", "distancia": 11},
    {"nome": "Inimigo 16", "distancia": 4},
    {"nome": "Inimigo 17", "distancia": 5},
    {"nome": "Inimigo 18", "distancia": 10},
    {"nome": "Inimigo 19", "distancia": 8},
    {"nome": "Inimigo 20", "distancia": 3}
]

# Distância limite para destruição
limite_distancia = 5

# game loop
while True:
    # Verifica se algum inimigo está dentro do limite de distância
    inimigos_atacados = []
    for inimigo in inimigos:
        if inimigo["distancia"] <= limite_distancia:
            inimigos_atacados.append(inimigo["nome"])
    
    # Se algum inimigo estiver perto o suficiente, atira neles
    if inimigos_atacados:
        print(f"Atirando em: {', '.join(inimigos_atacados)}")
        break  # Ou faça o que for necessário após o ataque

    # Caso contrário, imprime qual inimigo seria atacado
    inimigo_mais_perto = min(inimigos, key=lambda x: x["distancia"])
    print(f"Atirando em {inimigo_mais_perto['nome']} (distância: {inimigo_mais_perto['distancia']})")
    break  # Ou adicione mais lógica de continuação conforme necessário

# Conjuntos de personagens com diferentes níveis de poder
personagens_fortes = {"Goku", "Vegeta", "Broly"}
personagens_fracos = {"Yamcha", "Chiaotzu", "Krillin"}

# Função para exibir operações com conjuntos
def filtrar_personagens():
    print("Personagens fortes:", personagens_fortes)
    print("Personagens fracos:", personagens_fracos)
    
    # União (todos os personagens em ambos os conjuntos)
    todos_personagens = personagens_fortes | personagens_fracos
    print(f"\nTodos os personagens: {todos_personagens}")

    # Interseção (não há interseção, pois são conjuntos distintos)
    interseccao = personagens_fortes & personagens_fracos
    print(f"Interseção dos conjuntos (não deve ter): {interseccao}")

    # Diferença (personagens fortes que não são fracos)
    apenas_fortes = personagens_fortes - personagens_fracos
    print(f"Personagens fortes não fracos: {apenas_fortes}")

    # Diferença simétrica (personagens que estão em um dos conjuntos, mas não em ambos)
    diferenca_simetrica = personagens_fortes ^ personagens_fracos
    print(f"Diferença simétrica: {diferenca_simetrica}")

    # Adicionar e remover elementos
    personagens_fortes.add("Frieza")  # Adiciona um novo personagem
    personagens_fracos.remove("Yamcha")  # Remove um personagem
    print(f"\nAtualizações:")
    print(f"Personagens fortes: {personagens_fortes}")
    print(f"Personagens fracos: {personagens_fracos}")

# Executar a função
if __name__ == "__main__":
    filtrar_personagens()

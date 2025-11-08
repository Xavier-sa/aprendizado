# Conjuntos iniciais de personagens
guerreiros_z = {"Goku", "Vegeta", "Trunks", "Gohan"}
vilões = {"Frieza", "Cell", "Majin Buu", "Vegeta"}

# Função para exibir operações com conjuntos
def operar_conjuntos():
    print("Conjuntos iniciais:")
    print(f"Guerreiros Z: {guerreiros_z}")
    print(f"Vilões: {vilões}")
    
    # União (todos os personagens em ambos os conjuntos)
    uniao = guerreiros_z | vilões
    print(f"\nUnião dos conjuntos: {uniao}")

    # Interseção (personagens que estão em ambos os conjuntos)
    interseccao = guerreiros_z & vilões
    print(f"Interseção dos conjuntos: {interseccao}")

    # Diferença (personagens que estão em guerreiros_z mas não em vilões)
    diferenca = guerreiros_z - vilões
    print(f"Diferença dos conjuntos (Guerreiros Z - Vilões): {diferenca}")

    # Diferença simétrica (personagens que estão em um dos conjuntos, mas não em ambos)
    diferenca_simetrica = guerreiros_z ^ vilões
    print(f"Diferença simétrica dos conjuntos: {diferenca_simetrica}")

    # Adicionar e remover elementos
    guerreiros_z.add("Babidi")  # Adiciona um novo personagem
    vilões.remove("Cell")       # Remove um personagem
    print(f"\nGuerreiros Z após adição e vilões após remoção:")
    print(f"Guerreiros Z: {guerreiros_z}")
    print(f"Vilões: {vilões}")

# Função principal para testar as operações com conjuntos
if __name__ == "__main__":
    operar_conjuntos()

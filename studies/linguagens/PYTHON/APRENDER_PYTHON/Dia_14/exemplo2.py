# Conjuntos de planetas e naves espaciais
planetas = {"Terra", "Nomek", "Vegeta", "Earth"}
naves_espaciais = {"Space Pod", "Nimbus", "Kinto-un", "Space Pod"}

# Função para manipular planetas e naves espaciais
def operar_planetas_naves():
    print("Planetas:", planetas)
    print("Naves espaciais:", naves_espaciais)
    
    # União (todos os planetas e naves espaciais)
    todos_itens = planetas | naves_espaciais
    print(f"\nTodos os itens: {todos_itens}")

    # Interseção (itens que estão em ambos os conjuntos)
    interseccao = planetas & naves_espaciais
    print(f"Interseção dos conjuntos (não deve ter): {interseccao}")

    # Diferença (planetas que não são naves espaciais)
    apenas_planetas = planetas - naves_espaciais
    print(f"Planetas não são naves espaciais: {apenas_planetas}")

    # Diferença simétrica (itens que estão em um dos conjuntos, mas não em ambos)
    diferenca_simetrica = planetas ^ naves_espaciais
    print(f"Diferença simétrica: {diferenca_simetrica}")

    # Adicionar e remover elementos
    planetas.add("Planet Vegeta")  # Adiciona um novo planeta
    naves_espaciais.discard("Space Pod")  # Remove uma nave espacial (não gera erro se não existir)
    print(f"\nAtualizações:")
    print(f"Planetas: {planetas}")
    print(f"Naves espaciais: {naves_espaciais}")

# Executar a função
if __name__ == "__main__":
    operar_planetas_naves()

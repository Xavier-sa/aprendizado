# Conjuntos de transformações dos personagens
transformacoes_super_saiyajin = {"Super Saiyajin", "Super Saiyajin 2", "Super Saiyajin 3"}
transformacoes_fusionadas = {"Fusion", "Potara", "Super Saiyajin Blue"}

# Função para manipular transformações
def operar_transformacoes():
    print("Transformações Super Saiyajin:", transformacoes_super_saiyajin)
    print("Transformações Fusionadas:", transformacoes_fusionadas)
    
    # União (todas as transformações)
    todas_transformacoes = transformacoes_super_saiyajin | transformacoes_fusionadas
    print(f"\nTodas as transformações: {todas_transformacoes}")

    # Interseção (transformações que estão em ambos os conjuntos)
    interseccao = transformacoes_super_saiyajin & transformacoes_fusionadas
    print(f"Interseção dos conjuntos (não deve ter): {interseccao}")

    # Diferença (transformações Super Saiyajin que não são fusionadas)
    apenas_super_saiyajin = transformacoes_super_saiyajin - transformacoes_fusionadas
    print(f"Transformações Super Saiyajin não fusionadas: {apenas_super_saiyajin}")

    # Diferença simétrica (transformações que estão em um dos conjuntos, mas não em ambos)
    diferenca_simetrica = transformacoes_super_saiyajin ^ transformacoes_fusionadas
    print(f"Diferença simétrica: {diferenca_simetrica}")

    # Adicionar e remover elementos
    transformacoes_super_saiyajin.add("Super Saiyajin God")  # Adiciona nova transformação
    transformacoes_fusionadas.remove("Potara")  # Remove uma transformação fusionada
    print(f"\nAtualizações:")
    print(f"Transformações Super Saiyajin: {transformacoes_super_saiyajin}")
    print(f"Transformações Fusionadas: {transformacoes_fusionadas}")

# Executar a função
if __name__ == "__main__":
    operar_transformacoes()

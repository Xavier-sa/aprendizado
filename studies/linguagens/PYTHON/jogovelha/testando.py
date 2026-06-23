# Jogo da Velha simples no Google Colab
def exibir_tabuleiro(tabuleiro):
    for linha in tabuleiro:
        print(" | ".join(linha))
        print("-" * 9)

def verificar_vitoria(tabuleiro, jogador):
    # Linhas, colunas e diagonais
    for i in range(3):
        if all([cel == jogador for cel in tabuleiro[i]]):  # Linhas
            return True
        if all([tabuleiro[j][i] == jogador for j in range(3)]):  # Colunas
            return True
    if all([tabuleiro[i][i] == jogador for i in range(3)]):  # Diagonal principal
        return True
    if all([tabuleiro[i][2 - i] == jogador for i in range(3)]):  # Diagonal secundária
        return True
    return False

def jogo_da_velha():
    tabuleiro = [[" " for _ in range(3)] for _ in range(3)]
    jogador_atual = "X"
    jogadas = 0

    while True:
        exibir_tabuleiro(tabuleiro)
        print(f"Vez do jogador {jogador_atual}")

        try:
            linha = int(input("Escolha a linha (0, 1 ou 2): "))
            coluna = int(input("Escolha a coluna (0, 1 ou 2): "))
        except ValueError:
            print("Entrada inválida. Use números 0, 1 ou 2.")
            continue

        if not (0 <= linha < 3 and 0 <= coluna < 3):
            print("Posição fora do tabuleiro!")
            continue

        if tabuleiro[linha][coluna] != " ":
            print("Posição já ocupada!")
            continue

        tabuleiro[linha][coluna] = jogador_atual
        jogadas += 1

        if verificar_vitoria(tabuleiro, jogador_atual):
            exibir_tabuleiro(tabuleiro)
            print(f"🎉 Jogador {jogador_atual} venceu!")
            break
        elif jogadas == 9:
            exibir_tabuleiro(tabuleiro)
            print("⚖️ Empate!")
            break

        jogador_atual = "O" if jogador_atual == "X" else "X"

# Iniciar o jogo
jogo_da_velha()

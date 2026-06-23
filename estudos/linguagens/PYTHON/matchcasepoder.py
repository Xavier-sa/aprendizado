import random
import time

# Funções dos poderes
def ativar_velocidade(jogador, adversario):
    print(f"{jogador} ativou Super Velocidade (duração 30 segundos)!")
    time.sleep(2)  # Simula o uso do poder
    print(f"{jogador} ataca {adversario} com uma velocidade esmagadora!")
    dano = random.randint(10, 200)
    print(f"Golpe causado por {jogador}: {dano} de dano!")
    return dano

def ativar_forca(jogador, adversario):
    print(f"{jogador} ativou Super Força (duração 30 segundos)!")
    time.sleep(2)  # Simula o uso do poder
    print(f"{jogador} golpeia {adversario} com toda sua força!")
    dano = random.randint(150, 250)
    print(f"Golpe causado por {jogador}: {dano} de dano!")
    return dano

def ativar_telecinese(jogador, adversario):
    print(f"{jogador} ativou Telecinese (duração 10 segundos)!")
    time.sleep(2)  # Simula o uso do poder
    print(f"{jogador} usa telecinese para lançar objetos contra {adversario}!")
    dano = random.randint(50, 1500)
    print(f"Golpe causado por {jogador}: {dano} de dano!")
    return dano

# Função para exibir o status de vida dos jogadores
def mostrar_status(jogadores):
    print("\nStatus dos jogadores:")
    for jogador, vida in jogadores.items():
        print(f"{jogador}: {vida} HP")

# Função para selecionar o poder de um jogador
def escolher_poder(jogador, adversario):
    print(f"\n{jogador}, escolha seu poder para atacar {adversario}: ")
    print("1. Super Velocidade")
    print("2. Super Força")
    print("3. Telecinese")
    
    poder = int(input("Digite o número do poder (1, 2 ou 3): "))

    # Usando match-case para decidir qual poder ativar
    match poder:
        case 1:
            return ativar_velocidade(jogador, adversario)
        case 2:
            return ativar_forca(jogador, adversario)
        case 3:
            return ativar_telecinese(jogador, adversario)
        case _:
            print("Escolha inválida! O poder será escolhido aleatoriamente.")
            poder = random.choice([1, 2, 3])
            print(f"Escolhido automaticamente o poder {poder}.")
            match poder:
                case 1:
                    return ativar_velocidade(jogador, adversario)
                case 2:
                    return ativar_forca(jogador, adversario)
                case 3:
                    return ativar_telecinese(jogador, adversario)

# Função principal para rodar a batalha
def batalha(jogadores):
    # Inicializando o HP de cada jogador
    vida_jogadores = {jogador: 100 for jogador in jogadores}
    
    # Definindo a ordem dos turnos (jogadores vão se enfrentar em pares)
    while len(jogadores) > 1:
        jogador1 = jogadores[0]
        jogador2 = jogadores[1]

        print(f"\nA luta entre {jogador1} e {jogador2} começou!")
        mostrar_status(vida_jogadores)

        # Cada jogador escolhe um poder e ataca
        dano1 = escolher_poder(jogador1, jogador2)
        vida_jogadores[jogador2] -= dano1
        print(f"{jogador2} ficou com {vida_jogadores[jogador2]} HP!")

        if vida_jogadores[jogador2] <= 0:
            print(f"{jogador2} foi derrotado!")
            jogadores.remove(jogador2)
            continue  # Avança para o próximo confronto

        dano2 = escolher_poder(jogador2, jogador1)
        vida_jogadores[jogador1] -= dano2
        print(f"{jogador1} ficou com {vida_jogadores[jogador1]} HP!")

        if vida_jogadores[jogador1] <= 0:
            print(f"{jogador1} foi derrotado!")
            jogadores.remove(jogador1)
            continue  # Avança para o próximo confronto

        time.sleep(2)  # Intervalo entre os turnos

    # O vencedor final
    print(f"\n{jogadores[0]} venceu a batalha!")

# Início do jogo
def iniciar_jogo():
    print("Bem-vindo à Batalha de Superpoderes!")
    
    # Definir os jogadores
    jogadores = []
    num_jogadores = int(input("Digite o número de jogadores (mínimo 2): "))
    
    while num_jogadores < 2:
        print("Precisa haver pelo menos 2 jogadores!")
        num_jogadores = int(input("Digite o número de jogadores (mínimo 2): "))
    
    for j in range(num_jogadores):
        nome_jogador = input(f"Digite o nome do jogador {j+1}: ")
        jogadores.append(nome_jogador)
    
    print("\nA batalha vai começar! Cada jogador usará um poder para atacar.\n")
    batalha(jogadores)

# Chamar a função para iniciar o jogo
iniciar_jogo()

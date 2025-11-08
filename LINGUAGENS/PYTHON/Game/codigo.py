
import time

class Jogador:
    def __init__(self, nome, nivel):
        self.nome = nome
        self.nivel = nivel
        self.tempo_restante = 60  # tempo para executar a ação (60 segundos)
        self.ataque_realizado = False

    def usar_tecnica(self, tecnica):
        if self.tempo_restante > 0:
            print(f"{self.nome} está carregando a {tecnica}!")
            time.sleep(5)  # Simula o tempo de carregamento da Genki Dama
            print(f"{self.nome} completou a técnica {tecnica}!")
            return True
        else:
            print(f"{self.nome} não teve tempo para realizar a ação.")
            return False

    def atacar(self):
        if self.tempo_restante > 0:
            print(f"{self.nome} atacou!")
            self.ataque_realizado = True
            return True
        else:
            print(f"{self.nome} não teve tempo para atacar.")
            return False

# Exemplo de combate

jogador_a = Jogador("Jogador A", 1)
jogador_b = Jogador("Jogador B", 1)

# Jogador A começa a carregar a Genki Dama
print(f"Turno do {jogador_a.nome}")
jogador_a.usar_tecnica("Genki Dama")

# Jogador B tenta atacar antes de A terminar
print(f"Turno do {jogador_b.nome}")
jogador_b.atacar()

# Verificando a vitória
if jogador_b.ataque_realizado and jogador_a.tempo_restante > 0:
    print(f"{jogador_b.nome} venceu, interrompendo a técnica de {jogador_a.nome}!")
elif jogador_a.tempo_restante <= 0:
    print(f"{jogador_a.nome} perdeu por não completar a técnica no tempo!")
else:
    print(f"{jogador_a.nome} venceu, completando a Genki Dama!")

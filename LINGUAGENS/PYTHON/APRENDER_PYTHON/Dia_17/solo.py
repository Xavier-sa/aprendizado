# Classe base
class Caçador:
    def __init__(self, nome, nivel):
        self.nome = nome
        self.nivel = nivel

    def atacar(self):
        return f"{self.nome} ataca com nível de poder {self.nivel}!"

# Classe derivada
class CaçadorEvoluido(Caçador):
    def __init__(self, nome, nivel, habilidade):
        super().__init__(nome, nivel)
        self.habilidade = habilidade

    def usar_habilidade(self):
        return f"{self.nome} usa a habilidade {self.habilidade}!"

# Uso
sungjinwoo = CaçadorEvoluido("Sung Jin-Woo", 5, "Sombra")
print(sungjinwoo.atacar())        # Saída: Sung Jin-Woo ataca com nível de poder 5!
print(sungjinwoo.usar_habilidade())  # Saída: Sung Jin-Woo usa a habilidade Sombra!

# Classe base
class Cavaleiro:
    def __init__(self, nome, constelacao):
        self.nome = nome
        self.constelacao = constelacao

    def atacar(self):
        return f"{self.nome} ataca com o poder da {self.constelacao}!"

# Classe derivada
class CavaleiroDeOuro(Cavaleiro):
    def __init__(self, nome, constelacao):
        super().__init__(nome, constelacao)

    def usar_arma(self):
        return f"{self.nome} usa a arma sagrada da {self.constelacao}!"

# Uso
seiya = CavaleiroDeOuro("Seiya", "Pégaso")
print(seiya.atacar())       #? Saída: Seiya ataca com o poder da Pégaso!
print(seiya.usar_arma())    #?  Saída: Seiya usa a arma sagrada da Pégaso!

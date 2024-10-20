# Classe base
class Saiyajin:
    def __init__(self, nome):
        self.nome = nome
        self.potencial = 100

    def transformar(self):
        self.potencial *= 2
        return f"{self.nome} se transformou! Potencial agora é {self.potencial}."

# Classe derivada
class Goku(Saiyajin):
    def __init__(self, nome):
        super().__init__(nome)

    def kamehameha(self):
        return f"{self.nome} usou Kamehameha!"

# Uso
goku = Goku("Goku")
print(goku.transformar())  
print(goku.kamehameha())   

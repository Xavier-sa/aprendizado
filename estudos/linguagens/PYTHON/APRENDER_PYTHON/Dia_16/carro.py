class Carro:
    def __init__(self, modelo, ano):
        self.modelo = modelo
        self.ano = ano
        self.ligado = False

    def ligar(self):
        self.ligado = True
        return f"{self.modelo} está ligado."

    def desligar(self):
        self.ligado = False
        return f"{self.modelo} está desligado."

# Criando um objeto da classe Carro

carro1 = Carro("Opala", 1970)
print(f"{'-'*30}")
print(carro1.ligar())
print(f"{'-'*30}")
print(carro1.desligar())
print(f"{'-'*30}")

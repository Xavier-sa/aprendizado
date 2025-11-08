class Automoveis:
    def _init_(self,tipo,modelo, cor, motor):
        self.tipo= tipo 
        self.modelo =modelo 
        self.cor= cor
        self.motor= motor

    def exibir(self):
        print(f"Tipo é: {self.tipo}\nModelo é: {self.modelo}\nCor:{self.cor}\n Motor:{self.motor}")
        
carro=Automoveis("Fiat","Strada","Dark","1.8")
carro.exibir()
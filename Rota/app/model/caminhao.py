class Caminhao:
    def __init__(self, placa: str, modelo: str, capacidade: float):
        self.placa = placa
        self.modelo = modelo
        self.capacidade = capacidade
        self.disponivel = True
        self.motorista: Optional[Motorista] = None
    
    def __str__(self):
        status = "Disponível" if self.disponivel else "Em viagem"
        motorista = f" - Motorista: {self.motorista.nome}" if self.motorista else ""
        return f"Caminhão {self.placa}: {self.modelo} - {status}{motorista}"
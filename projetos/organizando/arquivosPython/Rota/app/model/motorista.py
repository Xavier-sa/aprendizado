

class Motorista:
    def __init__(self, id: int, nome: str, cnh: str, telefone: str):
        self.id = id
        self.nome = nome
        self.cnh = cnh
        self.telefone = telefone
        self.disponivel = True
    
    def __str__(self):
        return f"Motorista {self.id}: {self.nome} - CNH: {self.cnh}"

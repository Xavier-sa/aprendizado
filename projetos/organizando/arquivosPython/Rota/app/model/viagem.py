from datetime import datetime
from typing import Optional, List
from model.caminhao import Caminhao
from model.motorista import Motorista


class Viagem:
    def __init__(self, caminhao: Caminhao, motorista: Motorista, destino: str, carga: str):
        self.caminhao = caminhao
        self.motorista = motorista
        self.destino = destino
        self.carga = carga
        self.data_saida = datetime.now()
        self.data_retorno: Optional[datetime] = None
    
    def finalizar_viagem(self):
        self.data_retorno = datetime.now()
        self.caminhao.disponivel = True
        self.motorista.disponivel = True
        self.caminhao.motorista = None

from datetime import datetime
from typing import Optional, List
from model.motorista import Motorista
from model.caminhao import Caminhao
from model.viagem import Viagem

class SistemaController:
    def __init__(self):
        self.motoristas: List[Motorista] = []
        self.caminhoes: List[Caminhao] = []
        self.viagens: List[Viagem] = []
        self._inicializar_dados()
    
    def _inicializar_dados(self):
        # Inicializar 5 caminhões fixos
        caminhoes_data = [
            ("CCL001", "Volvo FH", 25.0),
            ("CCL002", "Scania R440", 30.0),
            ("CCL003", "Mercedes-Benz Actros", 28.0),
            ("CCL004", "DAF XF", 26.0),
            ("CCL005", "MAN TGX", 27.5)
        ]
        
        for placa, modelo, capacidade in caminhoes_data:
            self.caminhoes.append(Caminhao(placa, modelo, capacidade))
        
        # Inicializar 10 motoristas
        motoristas_data = [
            (1, "João Silva", "12345678901", "(11) 99999-1111"),
            (2, "Maria Santos", "12345678902", "(11) 99999-2222"),
            (3, "Pedro Oliveira", "12345678903", "(11) 99999-3333"),
            (4, "Ana Costa", "12345678904", "(11) 99999-4444"),
            (5, "Carlos Lima", "12345678905", "(11) 99999-5555"),
            (6, "Fernanda Rocha", "12345678906", "(11) 99999-6666"),
            (7, "Ricardo Alves", "12345678907", "(11) 99999-7777"),
            (8, "Juliana Pereira", "12345678908", "(11) 99999-8888"),
            (9, "Roberto Nunes", "12345678909", "(11) 99999-9999"),
            (10, "Amanda Souza", "12345678910", "(11) 99999-0000")
        ]
        
        for id, nome, cnh, telefone in motoristas_data:
            self.motoristas.append(Motorista(id, nome, cnh, telefone))
    
    def listar_caminhoes_disponiveis(self) -> List[Caminhao]:
        return [c for c in self.caminhoes if c.disponivel]
    
    def listar_motoristas_disponiveis(self) -> List[Motorista]:
        return [m for m in self.motoristas if m.disponivel]
    
    def buscar_caminhao_por_placa(self, placa: str) -> Optional[Caminhao]:
        for caminhao in self.caminhoes:
            if caminhao.placa.upper() == placa.upper():
                return caminhao
        return None
    
    def buscar_motorista_por_id(self, id: int) -> Optional[Motorista]:
        for motorista in self.motoristas:
            if motorista.id == id:
                return motorista
        return None
    
    def registrar_saida(self, placa_caminhao: str, id_motorista: int, destino: str, carga: str) -> bool:
        caminhao = self.buscar_caminhao_por_placa(placa_caminhao)
        motorista = self.buscar_motorista_por_id(id_motorista)
        
        if not caminhao or not motorista:
            return False
        
        if not caminhao.disponivel or not motorista.disponivel:
            return False
        
        # Registrar a saída
        viagem = Viagem(caminhao, motorista, destino, carga)
        self.viagens.append(viagem)
        
        # Atualizar status
        caminhao.disponivel = False
        motorista.disponivel = False
        caminhao.motorista = motorista
        
        return True
    
    def registrar_retorno(self, placa_caminhao: str) -> bool:
        caminhao = self.buscar_caminhao_por_placa(placa_caminhao)
        
        if not caminhao or caminhao.disponivel:
            return False
        
        # Encontrar viagem ativa
        viagem_ativa = None
        for viagem in self.viagens:
            if viagem.caminhao.placa == placa_caminhao and viagem.data_retorno is None:
                viagem_ativa = viagem
                break
        
        if viagem_ativa:
            viagem_ativa.finalizar_viagem()
            return True
        
        return False
    
    def listar_viagens_ativas(self) -> List[Viagem]:
        return [v for v in self.viagens if v.data_retorno is None]


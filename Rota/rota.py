"""
Sistema de Gerenciamento de Caminhões - Estrutura MVC unificada em um único arquivo
"""

# ==============================================================================
# 1. MODEL (model.py)
# ==============================================================================



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


# ==============================================================================
# 2. CONTROLLER (controller.py)
# ==============================================================================
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


# ==============================================================================
# 3. VIEW (view.py)
# ==============================================================================
class SistemaView:
    def __init__(self):
        self.controller = SistemaController()
    
    def exibir_menu_principal(self):
        while True:
            print("\n" + "="*50)
            print("SISTEMA DE GERENCIAMENTO DE CAMINHÕES")
            print("="*50)
            print("1. Listar caminhões disponíveis")
            print("2. Listar motoristas disponíveis")
            print("3. Registrar saída de caminhão")
            print("4. Registrar retorno de caminhão")
            print("5. Listar viagens ativas")
            print("6. Listar todos os caminhões")
            print("7. Listar todos os motoristas")
            print("0. Sair")
            print("-"*50)
            
            opcao = input("Escolha uma opção: ").strip()
            
            if opcao == "1":
                self.listar_caminhoes_disponiveis()
            elif opcao == "2":
                self.listar_motoristas_disponiveis()
            elif opcao == "3":
                self.registrar_saida()
            elif opcao == "4":
                self.registrar_retorno()
            elif opcao == "5":
                self.listar_viagens_ativas()
            elif opcao == "6":
                self.listar_todos_caminhoes()
            elif opcao == "7":
                self.listar_todos_motoristas()
            elif opcao == "0":
                print("Saindo do sistema...")
                break
            else:
                print("Opção inválida! Tente novamente.")
    
    def listar_caminhoes_disponiveis(self):
        print("\n--- CAMINHÕES DISPONÍVEIS ---")
        caminhoes = self.controller.listar_caminhoes_disponiveis()
        if not caminhoes:
            print("Nenhum caminhão disponível no momento.")
        else:
            for i, caminhao in enumerate(caminhoes, 1):
                print(f"{i}. {caminhao}")
    
    def listar_motoristas_disponiveis(self):
        print("\n--- MOTORISTAS DISPONÍVEIS ---")
        motoristas = self.controller.listar_motoristas_disponiveis()
        if not motoristas:
            print("Nenhum motorista disponível no momento.")
        else:
            for motorista in motoristas:
                print(f"{motorista}")
    
    def listar_todos_caminhoes(self):
        print("\n--- TODOS OS CAMINHÕES ---")
        for caminhao in self.controller.caminhoes:
            print(caminhao)
    
    def listar_todos_motoristas(self):
        print("\n--- TODOS OS MOTORISTAS ---")
        for motorista in self.controller.motoristas:
            status = "Disponível" if motorista.disponivel else "Em viagem"
            print(f"{motorista} - {status}")
    
    def registrar_saida(self):
        print("\n--- REGISTRAR SAÍDA DE CAMINHÃO ---")
        
        # Listar caminhões disponíveis
        caminhoes_disponiveis = self.controller.listar_caminhoes_disponiveis()
        if not caminhoes_disponiveis:
            print("Não há caminhões disponíveis para viagem.")
            return
        
        print("Caminhões disponíveis:")
        for caminhao in caminhoes_disponiveis:
            print(f"- {caminhao.placa}: {caminhao.modelo}")
        
        # Listar motoristas disponíveis
        motoristas_disponiveis = self.controller.listar_motoristas_disponiveis()
        if not motoristas_disponiveis:
            print("Não há motoristas disponíveis.")
            return
        
        print("\nMotoristas disponíveis:")
        for motorista in motoristas_disponiveis:
            print(f"- ID {motorista.id}: {motorista.nome}")
        
        # Coletar dados
        placa = input("\nDigite a placa do caminhão: ").strip().upper()
        try:
            id_motorista = int(input("Digite o ID do motorista: "))
        except ValueError:
            print("ID do motorista deve ser um número!")
            return
        
        destino = input("Digite o destino: ").strip()
        carga = input("Digite o tipo de carga: ").strip()
        
        if not placa or not destino or not carga:
            print("Todos os campos são obrigatórios!")
            return
        
        # Registrar saída
        if self.controller.registrar_saida(placa, id_motorista, destino, carga):
            print(f"\n✅ Saída registrada com sucesso!")
            print(f"Caminhão: {placa}")
            motorista = self.controller.buscar_motorista_por_id(id_motorista)
            print(f"Motorista: {motorista.nome}")
            print(f"Destino: {destino}")
            print(f"Carga: {carga}")
        else:
            print("\n❌ Erro ao registrar saída. Verifique se:")
            print("- A placa do caminhão está correta")
            print("- O ID do motorista está correto")
            print("- Ambos estão disponíveis")
    
    def registrar_retorno(self):
        print("\n--- REGISTRAR RETORNO DE CAMINHÃO ---")
        
        viagens_ativas = self.controller.listar_viagens_ativas()
        if not viagens_ativas:
            print("Não há viagens ativas no momento.")
            return
        
        print("Viagens ativas:")
        for viagem in viagens_ativas:
            print(f"- Caminhão: {viagem.caminhao.placa} | Motorista: {viagem.motorista.nome} | Destino: {viagem.destino}")
        
        placa = input("\nDigite a placa do caminhão que está retornando: ").strip().upper()
        
        if self.controller.registrar_retorno(placa):
            print(f"\n✅ Retorno registrado com sucesso para o caminhão {placa}!")
        else:
            print(f"\n❌ Erro ao registrar retorno. Verifique se a placa {placa} está em viagem.")
    
    def listar_viagens_ativas(self):
        print("\n--- VIAGENS ATIVAS ---")
        viagens = self.controller.listar_viagens_ativas()
        if not viagens:
            print("Nenhuma viagem ativa no momento.")
        else:
            for i, viagem in enumerate(viagens, 1):
                print(f"{i}. Caminhão: {viagem.caminhao.placa}")
                print(f"   Motorista: {viagem.motorista.nome}")
                print(f"   Destino: {viagem.destino}")
                print(f"   Carga: {viagem.carga}")
                print(f"   Data de saída: {viagem.data_saida.strftime('%d/%m/%Y %H:%M')}")
                print()


# ==============================================================================
# 4. ARQUIVO PRINCIPAL (main.py)
# ==============================================================================
def main():
    print("Inicializando Sistema de Gerenciamento de Caminhões...")
    sistema = SistemaView()
    sistema.exibir_menu_principal()

if __name__ == "__main__":
    main()
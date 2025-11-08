class TreinoController:
    def __init__(self, model, view):
        self.model = model
        self.view = view

    def exibir_treinos(self):
        treinos = self.model.carregar_treinos()
        self.view.exibir_treinos(treinos)

    def adicionar_treino(self):
        treino = self.view.solicitar_treino()
        self.model.adicionar_treino(treino)
        self.view.exibir_mensagem("Treino adicionado com sucesso!")

    def atualizar_treino(self):
        self.exibir_treinos()
        treino_id = int(input("Escolha o número do treino para atualizar o progresso: ")) - 1
        quantidade_realizada = self.view.solicitar_progresso()
        self.model.atualizar_progresso(treino_id, quantidade_realizada)
        self.view.exibir_mensagem("Progresso atualizado!")

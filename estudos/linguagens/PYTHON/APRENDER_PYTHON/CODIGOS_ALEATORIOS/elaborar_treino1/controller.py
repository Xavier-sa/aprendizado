import json
from datetime import datetime

class TreinoController:
    def __init__(self, model, view):
        self.model = model
        self.view = view

    def exibir_treinos(self):
        treinos = self.model.carregar_treinos()
        self.view.exibir_treinos(treinos)

    def adicionar_treino(self):
        treino = self.view.solicitar_treino()
        treino['data'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.model.adicionar_treino(treino)
        self.view.exibir_mensagem("Treino adicionado com sucesso!")

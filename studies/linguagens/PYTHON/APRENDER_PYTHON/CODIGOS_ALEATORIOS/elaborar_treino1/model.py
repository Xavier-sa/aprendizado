import json
from datetime import datetime

class TreinoModel:
    def __init__(self, arquivo_json="treinos.json"):
        self.arquivo_json = arquivo_json
        self.treinos = self.carregar_treinos()

    def carregar_treinos(self):
        try:
            with open(self.arquivo_json, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []

    def salvar_treinos(self):
        with open(self.arquivo_json, 'w') as f:
            json.dump(self.treinos, f, indent=4)

    def adicionar_treino(self, treino):
        self.treinos.append(treino)
        self.salvar_treinos()


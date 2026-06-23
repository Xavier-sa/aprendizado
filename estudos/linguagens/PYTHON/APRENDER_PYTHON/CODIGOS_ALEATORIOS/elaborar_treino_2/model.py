import json

class TreinoModel:
    def __init__(self, arquivo_json="1% _diario.json"):
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

    def atualizar_progresso(self, treino_id, quantidade_realizada):
        treino = self.treinos[treino_id]
        treino['restante'] -= quantidade_realizada
        if treino['restante'] < 0:
            treino['restante'] = 0
        self.salvar_treinos()

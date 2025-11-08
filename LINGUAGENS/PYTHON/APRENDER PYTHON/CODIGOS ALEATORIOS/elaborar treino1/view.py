class TreinoView:
    def exibir_treinos(self, treinos):
        if not treinos:
            print("Nenhum treino registrado.")
        else:
            for treino in treinos:
                print(f"Data: {treino['data']}, Atividade: {treino['atividade']}, Duração: {treino['duracao']} minutos")

    def solicitar_treino(self):
        atividade = input("Digite a atividade do treino: ")
        duracao = int(input("Digite a duração do treino (em minutos): "))
        return {"atividade": atividade, "duracao": duracao}

    def exibir_mensagem(self, mensagem):
        print(mensagem)

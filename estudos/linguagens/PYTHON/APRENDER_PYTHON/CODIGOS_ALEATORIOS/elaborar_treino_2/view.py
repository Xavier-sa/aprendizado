class TreinoView:
    def exibir_treinos(self, treinos):
        if not treinos:
            print("Nenhum treino registrado.")
        else:
            for idx, treino in enumerate(treinos):
                print(f"{idx + 1}. Atividade: {treino['atividade']}, Meta: {treino['meta']} repetições, Restante: {treino['restante']}")

    def solicitar_treino(self):
        atividade = input("Digite a atividade do treino (ex: Flexão): ")
        meta = int(input(f"Digite a meta diária para {atividade} (ex: 100): "))
        return {"atividade": atividade, "meta": meta, "restante": meta}

    def solicitar_progresso(self):
        quantidade = int(input("Quantas repetições você fez? "))
        return quantidade

    def exibir_mensagem(self, mensagem):
        print(mensagem)


class Quiz:
    def __init__(self):
        self.questions = [
            {
                "question": "O que é PNL, segundo Joseph O'Connor?",
                "options": ["A) Uma técnica de hipnose", "B) Um conjunto de ferramentas para comunicação e mudança", 
                            "C) Um método de meditação", "D) Uma teoria sobre inteligência emocional"],
                "answer": "B"
            },
            {
                "question": "Na PNL, o que se entende por 'possibilidade'?",
                "options": ["A) A capacidade de realizar uma tarefa", "B) A visão de alternativas e potenciais", 
                            "C) A expectativa de sucesso", "D) A limitação de crenças"],
                "answer": "B"
            },
            {
                "question": "O que O'Connor sugere sobre 'capacidade'?",
                "options": ["A) É inata e não pode ser desenvolvida", "B) Pode ser aumentada através de práticas e experiências", 
                            "C) É limitada por fatores externos", "D) Não tem relação com o comportamento humano"],
                "answer": "B"
            },
            {
                "question": "O que significa 'merecimento' no contexto da PNL?",
                "options": ["A) A ideia de que todos têm valor intrínseco", "B) A necessidade de provar seu valor aos outros", 
                            "C) A crença de que o sucesso deve ser conquistado", "D) A comparação com os outros para determinar valor"],
                "answer": "A"
            },
            {
                "question": "Qual é uma técnica da PNL para alterar crenças limitantes?",
                "options": ["A) Regressão hipnótica", "B) Análise de transações", 
                            "C) Reenquadramento", "D) Visualização criativa"],
                "answer": "C"
            }
        ]

    def run_quiz(self):
        score = 0
        for q in self.questions:
            print(q["question"])
            for option in q["options"]:
                print(option)
            answer = input("Sua resposta (A, B, C ou D): ").strip().upper()
            if answer == q["answer"]:
                print("Correto!\n")
                score += 1
            else:
                print(f"Incorreto! A resposta correta é {q['answer']}.\n")
        print(f"Você acertou {score} de {len(self.questions)} perguntas.")

if __name__ == "__main__":
    quiz = Quiz()
    quiz.run_quiz()
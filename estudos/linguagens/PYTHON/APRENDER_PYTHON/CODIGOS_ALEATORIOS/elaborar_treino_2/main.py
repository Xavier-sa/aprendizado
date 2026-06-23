from model import TreinoModel
from view import TreinoView
from controller import TreinoController




def main():
    model = TreinoModel()
    view = TreinoView()
    controller = TreinoController(model, view)

    while True:
        print("\n1. Ver treinos")
        print("2. Adicionar treino")
        print("3. Atualizar progresso de um treino")
        print("4. Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == '1':
            controller.exibir_treinos()
        elif opcao == '2':
            controller.adicionar_treino()
        elif opcao == '3':
            controller.atualizar_treino()
        elif opcao == '4':
            break
        else:
            print("Opção inválida!")

if __name__ == "__main__":
    main()

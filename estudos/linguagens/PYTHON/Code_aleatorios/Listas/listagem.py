list = [
{"Acordar 5h": True},
{"Tomar Copo Agua":False},
{"Tomar Banho":True},
{"Escovar Dentes":True},
{"Tomar Café":True},
{"Se arrumar":True},
{"Ligar Carro":True},
{"Tomar Banho":True}
]

def exibir_lista(lista):
    print("Lista de Tarefas")
    for i, item in enumerate(lista):
        for chave,valor in item.items():
            status = "[x]" if valor else "[]"
            print(f'{i+1} . {chave} --{status}')


def atualizar_tarefa(lista,indice,novo_status):
    item = lista[indice]
    chave = list(item.keys())[0]
    item[chave] = novo_status

exibir_lista(list)


while True:
    try: 
        opcao = int(input("Qual opção deseja editar? ou SAIR \n")).strip()
        print(opcao)

        if opcao == "sair":
            print("Programa será  Encerrado........ \0/")

        elif opcao == 1:
            print("")
    finally:
        break

# Lista inicial de tarefas
toDoList = [
    {"Acordar 5h": True},
    {"Tomou banho": True},
    {"Conferiu Git": True},
    {"Conferiu E-mail": False},
    {"Conferiu Linkedin": True},
    {"Foi trabalhar": True},
    {"Quitou Nubank": True},
    {"Quitou Bradesco": False}
]

# Função para exibir a lista de tarefas
def exibir_lista(lista):
    print("\nLista de Tarefas:")
    for i, item in enumerate(lista):
        for chave, valor in item.items():
            status = "[x]" if valor else "[]"
            print(f'{i+1}. {chave} -- {status}')

# Função para atualizar o status de uma tarefa
def atualizar_tarefa(lista, indice, novo_status):
    item = lista[indice]
    chave = list(item.keys())[0]
    item[chave] = novo_status

# Exibir a lista inicial
exibir_lista(toDoList)

# Permitir ao usuário atualizar tarefas
while True:
    try:
        escolha = int(input("\nDigite o número da tarefa para atualizar (ou 0 para sair): ")) - 1
        
        if escolha == -1:  # Caso o usuário escolha sair
            break
        elif 0 <= escolha < len(toDoList):  # Verificar se a escolha é válida
            nova_resposta = input("Digite o novo status (concluído/pendente): ").strip().lower()
            if nova_resposta == 'concluído':
                atualizar_tarefa(toDoList, escolha, True)
            elif nova_resposta == 'pendente':
                atualizar_tarefa(toDoList, escolha, False)
            else:
                print("Status inválido. Por favor, digite 'concluído' ou 'pendente'.")
            
            # Exibir a lista atualizada
            exibir_lista(toDoList)
        else:
            print("Número da tarefa inválido. Tente novamente.")
    except ValueError:
        print("Entrada inválida. Por favor, digite um número.")

print("Programa encerrado.")

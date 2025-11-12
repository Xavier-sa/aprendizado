opcao = input("Deseja iniciar? Para sair, digite [chupacabra]: ")

while True:
    if opcao == "chupacabra":
        print("Você saiu do loop com sucesso")
        break  # Para sair do loop
    else:
        # Aqui você pode adicionar o que deve acontecer se a opção não for "chupacabra"
        print("Você não digitou 'chupacabra'. Tente novamente.")
        opcao = input("Deseja iniciar? Para sair, digite [chupacabra]: ")

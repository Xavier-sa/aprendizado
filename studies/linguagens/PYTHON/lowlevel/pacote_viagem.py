def exibir_pacotes():
    print("=" * 8 + " Pacotes de Viagem " + "=" * 8)
    print("| 1 - Rio de Janeiro (R$2500)     |")
    print("| 2 - Tokyo (R$3500)              |")
    print("| 3 - Paris (R$5000)              |")
    print("| 0 - Sair                        |")
    print("=" * 35)

def obter_dados_pacote(destino):
    if destino == "1":
        return "Rio de Janeiro", 2500, ["Cristo Redentor", "Praia de Copacabana", "Pão de Açúcar"]
    elif destino == "2":
        return "Tokyo", 3500, ["Monte Fuji", "Anime Museum", "Templo Senso-ji"]
    elif destino == "3":
        return "Paris", 5000, ["Torre Eiffel", "Museu do Louvre", "Palácio de Versailles"]
    else:
        return None, 0, []

def escolher_passeios(passeios_disponiveis):
    print("\nPasseios disponíveis:")
    print("Digite 0 para encerrar antes dos 3 passeios.")
    print("1 -", passeios_disponiveis[0])
    print("2 -", passeios_disponiveis[1])
    print("3 -", passeios_disponiveis[2])

    passeios_escolhidos = []
    contador = 0

    while contador < 3:
        passeio = input("Escolha o passeio (1, 2, 3 ou 0): ")

        if passeio == "0":
            break

        if passeio == "1":
            passeio_nome = passeios_disponiveis[0]
        elif passeio == "2":
            passeio_nome = passeios_disponiveis[1]
        elif passeio == "3":
            passeio_nome = passeios_disponiveis[2]
        else:
            print("Opção inválida.")
            continue

        if passeio_nome not in passeios_escolhidos:
            passeios_escolhidos.append(passeio_nome)
            contador += 1
        else:
            print("Você já escolheu esse passeio.")

    return passeios_escolhidos

def exibir_resumo(nome_pacote, valor_pacote, passeios):
    print("\nResumo da Compra:")
    print("Destino escolhido:", nome_pacote)
    print("Valor do pacote: R$", valor_pacote)
    print("Passeios incluídos:")
    for passeio in passeios:
        print("-", passeio)

def main():
    exibir_pacotes()
    destino = input("Escolha o destino (1, 2 ou 3): ")

    if destino == "0":
        print("Programa encerrado.")
        return

    nome, valor, passeios_disponiveis = obter_dados_pacote(destino)

    if nome is None:
        print("Destino inválido.")
        return

    passeios_escolhidos = escolher_passeios(passeios_disponiveis)
    exibir_resumo(nome, valor, passeios_escolhidos)


main()

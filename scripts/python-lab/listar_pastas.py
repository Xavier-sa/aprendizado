from pathlib import Path

# Defina o caminho relativo ou absoluto da pasta que você quer listar
caminho = Path('./')  # Diretório atual

# Verifica se a pasta existe
if caminho.exists() and caminho.is_dir():
    # Cria uma lista de pastas encontradas
    pastas = [pasta for pasta in caminho.iterdir() if pasta.is_dir()]

    if pastas:
        print("Selecione uma pasta:")
        for idx, pasta in enumerate(pastas, start=1):
            print(f"{idx}. {pasta.name}")

        try:
            # Solicita ao usuário que escolha uma pasta
            escolha = int(input("Digite o número da pasta desejada: "))
            
            # Verifica se a escolha está dentro dos números válidos
            if 1 <= escolha <= len(pastas):
                pasta_selecionada = pastas[escolha - 1]
                print(f"\nVocê selecionou a pasta: {pasta_selecionada.name}")
                
                # Exibe o conteúdo da pasta selecionada
                print("\nConteúdo da pasta:")
                for item in pasta_selecionada.iterdir():
                    if item.is_dir():
                        print(f"[Pasta] {item.name}")
                    else:
                        print(f"[Arquivo] {item.name}")
            else:
                print("Número inválido.")
        except ValueError:
            # Se o usuário digitar algo que não seja número, abrir o arquivo minhalogo.py
            print("Entrada inválida! Abrindo o arquivo minhalogo.py...\n")
            
            try:
                # Tenta abrir o arquivo 'minhalogo.py' e exibir seu conteúdo
                with open('tela.py', 'r') as arquivo:
                    print(arquivo.read())
            except FileNotFoundError:
                print("O arquivo 'minhalogo.py' não foi encontrado!")
    else:
        print("Não há pastas no diretório especificado.")
else:
    print(f"A pasta '{caminho}' não foi encontrada!")

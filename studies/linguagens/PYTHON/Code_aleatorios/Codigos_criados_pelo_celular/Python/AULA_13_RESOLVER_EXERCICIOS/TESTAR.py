def obter_categoria(idade, grupo_risco):
    # Inicializa a categoria com None
    categoria = None

    # Verifica a faixa etária e o grupo de risco para determinar a categoria
    match (idade, grupo_risco):
        # Faixa etária de 17 a 20 anos
        case 17, 1:
            categoria = "Baixo risco - Categoria 1"
        case 17, 2:
            categoria = "Médio risco - Categoria 2"
        case 17, 3:
            categoria = "Alto risco - Categoria 3"
        
        # Faixa etária de 21 a 24 anos
        case 21, 2:
            categoria = "Baixo risco - Categoria 2"
        case 21, 3:
            categoria = "Médio risco - Categoria 3"
        case 21, 4:
            categoria = "Alto risco - Categoria 4"

        # Faixa etária de 25 a 34 anos
        case 25, 3:
            categoria = "Baixo risco - Categoria 3"
        case 25, 4:
            categoria = "Médio risco - Categoria 4"
        case 25, 5:
            categoria = "Alto risco - Categoria 5"

        # Faixa etária de 35 a 64 anos
        case 35, 4:
            categoria = "Baixo risco - Categoria 4"
        case 35, 5:
            categoria = "Médio risco - Categoria 5"
        case 35, 6:
            categoria = "Alto risco - Categoria 6"
        
        # Faixa etária de 65 a 70 anos
        case 65, 7:
            categoria = "Baixo risco - Categoria 7"
        case 65, 8:
            categoria = "Médio risco - Categoria 8"
        case 65, 9:
            categoria = "Alto risco - Categoria 9"

        # Outras faixas etárias não contempladas
        case _:
            categoria = None

    return categoria

def main():
    # Solicita ao usuário o nome do pretendente
    nome = input("Digite o nome do pretendente: ")

    # Solicita ao usuário a idade do pretendente
    idade = int(input("Digite a idade do pretendente: "))

    # Solicita ao usuário o grupo de risco do pretendente
    print("Grupos de risco: 1 a 9")
    grupo_risco = int(input("Digite o grupo de risco do pretendente (1 a 9): "))

    # Verifica se a idade está na faixa de 17 a 70 anos
    if idade < 17 or idade > 70:
        print("Idade fora da faixa necessária.")
    else:
        # Calcula a categoria do pretendente
        categoria = obter_categoria(idade, grupo_risco)
        
        if categoria:
            # Exibe o resultado
            print(f"Nome: {nome}")
            print(f"Idade: {idade}")
            print(f"Categoria: {categoria}")
        else:
            print("Idade fora da faixa necessária.")

# Executa a função principa
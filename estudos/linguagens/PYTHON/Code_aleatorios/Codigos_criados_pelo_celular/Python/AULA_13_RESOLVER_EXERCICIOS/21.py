'''
21. Uma Companhia de Seguros possui nove categorias de seguro baseadas na idade e
ocupação do segurado. Somente pessoas com pelo menos 17 anos e não mais de 70
anos podem adquirir apólices de seguro. Quanto às classes de ocupações, foram
definidos três grupos de risco. A tabela abaixo fornece as categorias em função da
faixa etária e do grupo de risco. Dados nome, idade e grupo de risco, determinar a
categoria do pretendente à aquisição de tal seguro. Imprimir o nome a idade e a
categoria do pretendente, e , caso a idade não esteja na faixa necessária, imprimir uma
mensagem.'''

def obter_categoria(idade, grupo_risco):
    categoria = None
    if 17 <= idade <= 20:
        # Faixa etária de 17 a 20 anos
        if grupo_risco == 1:
            categoria = "Baixo risco - Categoria 1"
        elif grupo_risco == 2:
            categoria = "Médio risco - Categoria 2"
        elif grupo_risco == 3:
            categoria = "Alto risco - Categoria 3"
    elif 21 <= idade <= 24:
        # Faixa etária de 21 a 24 anos
        if grupo_risco == 2:
            categoria = "Baixo risco - Categoria 2"
        elif grupo_risco == 3:
            categoria = "Médio risco - Categoria 3"
        elif grupo_risco == 4:
            categoria = "Alto risco - Categoria 4"
    elif 25 <= idade <= 34:
        # Faixa etária de 25 a 34 anos
        if grupo_risco == 3:
            categoria = "Baixo risco - Categoria 3"
        elif grupo_risco == 4:
            categoria = "Médio risco - Categoria 4"
        elif grupo_risco == 5:
            categoria = "Alto risco - Categoria 5"
    elif 35 <= idade <= 64:
        # Faixa etária de 35 a 64 anos
        if grupo_risco == 4:
            categoria = "Baixo risco - Categoria 4"
        elif grupo_risco == 5:
            categoria = "Médio risco - Categoria 5"
        elif grupo_risco == 6:
            categoria = "Alto risco - Categoria 6"
    elif 65 <= idade <= 70:
        # Faixa etária de 65 a 70 anos
        if grupo_risco == 7:
            categoria = "Baixo risco - Categoria 7"
        elif grupo_risco == 8:
            categoria = "Médio risco - Categoria 8"
        elif grupo_risco == 9:
            categoria = "Alto risco - Categoria 9"
    else:
        # Idade fora da faixa necessária
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
    if idade > 17 or idade > 70:
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

# Executa a função principal
if __name__ == "__main__":
    main()


#nao consegui concluir
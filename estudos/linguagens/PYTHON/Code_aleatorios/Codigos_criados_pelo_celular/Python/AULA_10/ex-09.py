'''9. Faça um algoritmo para ler três notas de um aluno em uma disciplina e imprimir a sua
média ponderada (as notas têm pesos respectivos de 1, 2 e 3).'''

def calcular_media_ponderada():
    # entrda
    nota1 = float(input("Insira a primeira nota do aluno (peso 1): "))
    nota2 = float(input("Insira a segunda nota do aluno (peso 2): "))
    nota3 = float(input("Insira a terceira nota do aluno (peso 3): "))

    
    peso1 = 1
    peso2 = 2
    peso3 = 3

    #processamento
    soma_produtos = (nota1 * peso1) + (nota2 * peso2) + (nota3 * peso3)

   
    soma_pesos = peso1 + peso2 + peso3

    
    media_ponderada = soma_produtos / soma_pesos

    #saida
    print(f"A média ponderada do aluno é: {media_ponderada:.2f}")

calcular_media_ponderada()
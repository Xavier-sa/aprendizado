'''
14. Escrever um algoritmo que leia o nome e as três notas obtidas por um aluno durante o
semestre. Calcular a sua média (aritmética), informar o nome e sua menção aprovado
(media >= 7), Reprovado (media <= 5) e Recuperação (media entre 5.1 a 6.9).
'''
#entradas
nome_aluno = input("Digite o nome do aluno: ")
nota1 = float(input("Digite a primeira nota: "))
nota2 = float(input("Digite a segunda nota: "))
nota3 = float(input("Digite a terceira nota: "))
#processamento
media = (nota1 + nota2 + nota3) / 3
#nome do aluno
print(f"Nome do aluno: {nome_aluno}")
if media >= 7:
    print(f"Situação: Aprovado (média: {media:.2f})")
elif media <= 5:
    print(f"Situação: Reprovado (média: {media:.2f})")
else:
    print(f"Situação: Recuperação (média: {media:.2f})")


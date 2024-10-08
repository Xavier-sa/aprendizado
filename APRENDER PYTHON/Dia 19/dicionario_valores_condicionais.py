notas = {'João': 85, 'Ana': 72, 'Pedro': 90, 'Maria': 60}
resultados = {aluno: 'Aprovado' if nota >= 70 else 'Reprovado' for aluno, nota in notas.items()}
print(resultados)

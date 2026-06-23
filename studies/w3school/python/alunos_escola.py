school_class = {}

# Loop para inserir dados
while True:
    name = input("Digite o nome do aluno (ou deixe em branco para sair): ")
    
    # Condição de saída do loop
    if name == '':
        break
    
    # Entrar com a pontuação do aluno
    score = int(input("Insira a pontuação do aluno (0-10): "))
    
    # Verificar se a pontuação é válida
    if score not in range(0, 11):
        print("Pontuação inválida! Insira uma pontuação entre 0 e 10.")
        continue  # Pede novamente a pontuação se estiver fora do intervalo
    
    # Adicionar a pontuação ao aluno (se já existir, adiciona a nova pontuação)
    if name in school_class:
        school_class[name].append(score)
    else:
        school_class[name] = [score]
    
# Exibir a média das pontuações dos alunos
for name in sorted(school_class.keys()):
    scores = school_class[name]
    average = sum(scores) / len(scores)
    print(f"{name}: {average:.2f}")

# Função para calcular a altura da pirâmide
def calcular_altura_piramide(num_blocos):
    altura = 0
    blocos_usados = 0
    
    while True:
        # A próxima camada requer altura + 1 blocos
        altura += 1
        blocos_usados += altura
        
        # Verifica se ainda temos blocos suficientes
        if blocos_usados > num_blocos:
            altura -= 1  # Retorna a altura à última camada concluída
            break
    
    return altura

# Solicita ao usuário o número de blocos
num_blocos = int(input("Digite o número de blocos: "))

# Calcula a altura da pirâmide
altura_piramide = calcular_altura_piramide(num_blocos)

# Imprime a altura da pirâmide
print("A altura da pirâmide:", altura_piramide)

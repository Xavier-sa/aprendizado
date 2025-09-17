def calcular_media(n1: float, n2: float, n3: float) -> float:
    """
    Calcula a média aritmética de três notas
    """
    if not all(0 <= nota <= 10 for nota in [n1, n2, n3]):
        raise ValueError("Todas as notas devem estar entre 0 e 10")
    
    return (n1 + n2 + n3) / 3

def determinar_situacao(media: float, frequencia: float = 75.0) -> str:
    """
    Determina a situação do aluno com base na média e frequência
    """
    if not 0 <= frequencia <= 100:
        raise ValueError("Frequência deve estar entre 0 e 100%")
    
    if media >= 7.0 and frequencia >= 75.0:
        return "Aprovado"
    elif media >= 5.0 and frequencia >= 75.0:
        return "Recuperação"
    else:
        return "Reprovado"

def main():
    """
    Função principal para entrada de dados do usuário
    """
    try:
        print("=== Sistema de Avaliação Escolar ===\n")
        
        # Entrada de dados
        n1 = float(input("Digite a nota N1 (0-10): "))
        n2 = float(input("Digite a nota N2 (0-10): "))
        n3 = float(input("Digite a nota N3 (0-10): "))
        frequencia = float(input("Digite a frequência (%): "))
        
        # Cálculos
        media = calcular_media(n1, n2, n3)
        situacao = determinar_situacao(media, frequencia)
        
        # Exibição de resultados
        print(f"\nMédia: {media:.2f}")
        print(f"Frequência: {frequencia:.1f}%")
        print(f"Situação: {situacao}")
        
    except ValueError as e:
        print(f"\nErro: {e}")
    except Exception as e:
        print(f"\nOcorreu um erro inesperado: {e}")

if __name__ == "__main__":
    main()
# -------------------------------------------------------
# Sistema de Verificação de Notas - Nível Sênior (base)
# Autor: Wellington Xavier
# Data: 26/10/2025
# -------------------------------------------------------

class Aluno:
    """Classe que representa um aluno e sua avaliação."""
    
    def __init__(self, nome: str, nota: float):
        self.nome = nome
        self.nota = nota
    
    def verificar_aprovacao(self) -> str:
        """Retorna o status de aprovação com base na nota."""
        if self.nota >= 7.0:
            return f"✅ {self.nome} está APROVADO com nota {self.nota:.1f}."
        elif 5.0 <= self.nota < 7.0:
            return f"⚠️ {self.nome} está em RECUPERAÇÃO com nota {self.nota:.1f}."
        else:
            return f"❌ {self.nome} está REPROVADO com nota {self.nota:.1f}."


def main():
    """Função principal do programa."""
    print("-" * 40)
    print(" SISTEMA DE VERIFICAÇÃO DE NOTAS ")
    print("-" * 40)
    
    nome = input("Digite o nome do aluno: ").strip()
    
    # Validação da entrada de nota
    while True:
        try:
            nota = float(input(f"Digite a nota final de {nome}: "))
            if 0 <= nota <= 10:
                break
            else:
                print("⚠️ A nota deve estar entre 0 e 10.")
        except ValueError:
            print("❌ Entrada inválida. Digite um número válido.")
    
    aluno = Aluno(nome, nota)
    print("-" * 40)
    print(aluno.verificar_aprovacao())
    print("-" * 40)


if __name__ == "__main__":
    main()


# Definição da classe Pessoa
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade
    
    def apresentar(self):
        print(f"Olá, meu nome é {self.nome} e tenho {self.idade} anos.")

# Definição da subclasse Estudante que herda de Pessoa
class Estudante(Pessoa):
    def __init__(self, nome, idade, curso):
        super().__init__(nome, idade)  # Chama o construtor da classe base
        self.curso = curso
    
    def apresentar(self):
        print(f"Oi, eu sou {self.nome}, tenho {self.idade} anos e estudo {self.curso}.")

# Exemplo de uso das classes
pessoa1 = Pessoa("Xavier", 30)
pessoa1.apresentar()

estudante1 = Estudante("Wellington", 30, "Ciências Contabeis ")
estudante1.apresentar()

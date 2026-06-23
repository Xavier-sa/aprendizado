# Classe base: Funcionário
class Funcionario:
    def __init__(self, nome, idade, salario):
        self.nome = nome
        self.idade = idade
        self.salario = salario

    def exibir_informacoes(self):
        print(f"Nome: {self.nome}, Idade: {self.idade}, Salário: {self.salario}")


# Subclasse: Coletor
class Coletor(Funcionario):
    def __init__(self, nome, idade, salario, tem_habilitacao):
        super().__init__(nome, idade, salario)
        self.tem_habilitacao = tem_habilitacao

    def exibir_informacoes(self):
        super().exibir_informacoes()
        if self.tem_habilitacao:
            print("Possui habilitação para dirigir veículos da empresa.")
        else:
            print("Não possui habilitação para dirigir veículos da empresa.")


# Exemplo de uso:
coletor1 = Coletor("TRUNKS", 22, 8000, True)
coletor2 = Coletor("GOHAN", 25, 9000, False)

coletor1.exibir_informacoes()
coletor2.exibir_informacoes()
# Subclasse: Mecânico
class Mecanico(Funcionario):
    def __init__(self, nome, idade, salario, especializacao):
        super().__init__(nome, idade, salario)
        self.especializacao = especializacao

    def exibir_informacoes(self):
        super().exibir_informacoes()
        print(f"Especialização: {self.especializacao}")

# Subclasse: Motorista
class Motorista(Funcionario):
    def __init__(self, nome, idade, salario, categoria):
        super().__init__(nome, idade, salario)
        self.categoria = categoria

    def exibir_informacoes(self):
        super().exibir_informacoes()
        print(f"Categoria de habilitação: {self.categoria}")

# Exemplo de uso das novas subclasses:
mecanico1 = Mecanico("BABY", 35, 3000, "Automóveis")
motorista1 = Motorista("BOO", 40, 2800, "D")

mecanico1.exibir_informacoes()
motorista1.exibir_informacoes()

class Funcionario:
    def __init__(self, nome, cargo):
        self.nome = nome  #! Atributo para o nome do funcionário
        self.cargo = cargo  #!Atributo para o cargo do funcionário

    def apresentar(self):
        #! Método para apresentar o funcionário
        return f"Olá, meu nome é {self.nome} e eu sou {self.cargo}."

#! Criando um objeto da classe Funcionario
funcionario1 = Funcionario("Majin boo", "Desenvolvedor")
funcionario2 = Funcionario("Kakarooto", "Analista")
#!Chamando o método apresentar
print(f"{'-'*30}")
print(funcionario1.apresentar())
print(f"{'-'*30}")
print(funcionario2.apresentar())
print(f"{'-'*30}")

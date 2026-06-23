class Setor:
    def __init__(self, nome, horario):
        self.nome = nome
        self.horario = horario

    def __str__(self):
        return f"{self.nome}: {self.horario}"


class Solurb:
    def __init__(self):
        self.setores = []

    def adicionar_setor(self, setor):
        self.setores.append(setor)

    def listar_setores(self):
        for setor in self.setores:
            print(f"{'-'*37} {setor}")


# #!Criação dos setores
setor1 = Setor("DP", "07:00 às 11:00 e das 13:00 às 17:00")
setor2 = Setor("Financeiro", "08:00 às 12:00 e das 14:00 às 18:00")
setor3 = Setor("Recepação","07:30 às 11:00 e das 14:00 às 17:00")

# #!Criação da instância Solurb e adição dos setores
solurb = Solurb()

solurb.adicionar_setor(setor1)

solurb.adicionar_setor(setor2)

solurb.adicionar_setor(setor3)


# Listagem dos setores
solurb.listar_setores()

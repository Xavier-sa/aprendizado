print("Hello, World!\nBem Vindo ao seu livro de contas e dividas:")

class Bancos_Financeiras:
    def __init__(self, banco, valor, tipo_divida):
        self.banco = banco
        self.valor = valor
        self.tipo_divida = tipo_divida
        
    def exibir(self):
        print(f"Banco: {self.banco}")
        print(f"Valor: {self.valor}")
        print(f"Tipo de dívida: {self.tipo_divida}")

# Criando instâncias da classe
banco1 = Bancos_Financeiras("Mercado Pago", 1000, "Empréstimo")
banco2 = Bancos_Financeiras("Bradesco", 500, "Crédito")

# Exibindo as informações
banco1.exibir()
banco2.exibir()
banco3.exibir()

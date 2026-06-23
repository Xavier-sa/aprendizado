class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor
        return f"Deposito de {valor} realizado.\n Saldo atual: {self.saldo}"

    def sacar(self, valor):
        if valor <= self.saldo:
            self.saldo -= valor
            return f"Saque de {valor} realizado.\n Saldo atual: {self.saldo}"
        return "Saldo insuficiente."

# Criando um objeto da classe ContaBancaria
conta1 = ContaBancaria("Freeza", 100)
conta2 = ContaBancaria("Broly",1101)
print(f"{'-'*30}")
print(conta1.depositar(50))
print(f"{'-'*30}")
print(conta1.sacar(30))
print(f"{'-'*30}")
print(conta2.sacar(1100))
print(f"{'-'*30}")

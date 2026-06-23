class CaixaEletronico:
    def __init__(self, saldo_inicial=10):
        self.saldo = saldo_inicial
    
    def mostrarSaldo(self):
        return self.saldo
    
    def depositar(self, valor):
        self.saldo += valor

# Criando uma instância do caixa eletrônico
cx = CaixaEletronico(1100)

# Mostrando o saldo inicial
print(cx.mostrarSaldo())  # Saída: 10

# Depositando um valor
cx.depositar(20)

# Mostrando o saldo após o depósito
print(cx.mostrarSaldo())  # Saída: 30

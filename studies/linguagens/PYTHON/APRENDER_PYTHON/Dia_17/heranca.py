# Classe base
class Animal:
    def __init__(self, nome):
        self.nome = nome

    def fazer_som(self):
        return "Som de animal"

# Classe derivada
class Cachorro(Animal):
    def fazer_som(self):
        return "Au Au"

# Uso
meu_cachorro = Cachorro("Rex")
meu_cachorro2 = Cachorro("Thor")
print(meu_cachorro.nome)  # Saída: Rex
print(meu_cachorro.fazer_som())  # Saída: Au Au
print(meu_cachorro2.nome)
print(meu_cachorro2.fazer_som())

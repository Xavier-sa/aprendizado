"POO - ORGANIZA O CODIGO EM OBJETOS"
"OBJETOS COMBINAM 'DADOS E FUNÇÕES' "
"QUE OPERAM SOBRE ESSES DADOS"
#CLASS

class Pessoa:
    def __init__(self,nome,idade):
        self.nome = nome
        self.idade = idade
        
    def info(self):
        return f" OLA MEU NOME É: {self.nome}, tenho:{self.idade} anos"
print('-'*30)        
#OBJETO - instância de uma classe

pessoa1 = Pessoa("XAVIER",130)
print(pessoa1.info())


print('-'*30)

#HERANÇA - permitr criar uma nova classe com base em uma class existente

class Estudante(Pessoa):
    def __init__(self,nome,idade,curso):
        super().__init__(nome,idade)  
        self.curso = curso
        
    def info(self):
        return f"{super().info()} Estou cursando {self.curso}"        
        
estudante1 = Estudante("Xavier",130,"Desenvolvimento Sistemas")       
print(estudante1.info())


print('-'*30)
#ENCAPSULAMENTO - protefe os dados internos de uma class, expondo apenas o necesario

class ContaBancaria:
    def __init__(self,saldo):
        self.__saldo += saldo
        
    def depositar(self,valor ):
        self.__saldo += valor
        
    def retirar(self,valor):
        if valor <= self.__saldo:
           self.__saldo -= valor
        else:
            print("Saldo insuficiente")
            
    def mostrar_saldo(self):
        return f"Saldo atual:{self.saldo}"

print('-'*30)
        
#POLIMORFISMO - permitr que métodos com o mesmo nome se comportem de maneira diferente em diferentes class.

class Animal:
    def falar(self):
        return "Som de animal"
    
class Cachorro(Animal):
    def falar(self):
        return "Au Au"
        
class Gato(Animal):
    def falar(self):
        return "Miau"
        
lili = Cachorro()
sadan = Cachorro()
nina = Gato()
choper = Gato()

print(lili.falar())
print(choper.falar())
print(nina.falar())
print(sadan.falar())

print('-'*30)
print("MEU RESUMO:")   
print()
print("LÓGICA DE PROGRAMAÇÃO: envolve estruturas basicas como SEQUÊNCIA, CONDICIONAIS e LAÇOS DE REPETIÇÃO(for,while), além de funções.")

print('-'*30)
print("POO:")
print()
print("organiza o codigo em class e objetos(instacia), usando conceitos como herança,encapsulamento e polimorfismo para estrutuar e reutilizar o código de forma eficaz")





        
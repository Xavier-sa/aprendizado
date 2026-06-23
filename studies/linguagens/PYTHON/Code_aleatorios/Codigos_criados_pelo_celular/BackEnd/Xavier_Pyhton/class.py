class Pessoa:
    def __init__(self, nome, idade, peso, altura):
        self.nome = nome
        self.idade = idade
        self.peso = peso
        self.altura = altura


    def envelhecer_pessoa(self):
        envelhecer =  self.idade + anos
        return envelhecer

    def engordar_pessoas(self):
        engordou = self.peso + peso1 
        return engordou
    
    def emagrecer_pessoa(self):
        emagreceu = self.peso - peso2
        return emagreceu
    
    def crescer_pessoa(self):
        if self.idade > 21:
            print('essa pessoa nao cresce mais')
        elif self.idade < 21 and self.idade > 0:
            altura = anos2 * 0.5 
            return altura
        

nome = input('qual o nome da pessoa?: ')
idade = int(input('qual a idade da pessoa?: '))
peso = int(input('qual o peso da pessoa?: '))
altura = float(input('qual a altura da pessoa?: '))

pessoa = Pessoa(nome, idade, peso, altura)
opcao = 0

while opcao != 5:

    print('-----------MENU---------------')
    print('OQUE DESEJA ALTERAR NA PESSOA?')
    print('------1. ENVELHECER-----------')
    print('------2. ENGORDAR-------------')
    print('------3. EMAGRECER------------')
    print('------4. CRESCER--------------')
    print('------5. SAIR-----------------')

    opcao = int(input('qual opção acima?'))

            

    if opcao == 1:
        anos = int(input('quantos anos deseja envelhecer?: '))
        print(f'agora voce tem {pessoa.envelhecer_pessoa()}, anos de idade')

    elif opcao == 2:
        peso1 = int(input('quantos quilos voce deseja engordar a pessoa?: '))
        print(f'agora voce tem {pessoa.engordar_pessoas()}, kG de peso')

    elif opcao == 3:
        peso2 = int(input('quantos quilos voce deseja emagrecer  a pessoa?: '))
        print(f'agora voce tem {pessoa.emagrecer_pessoa()}, kG de peso')

    elif opcao == 4:
        anos2 = int(input('quantos anos se passaram para calcular sua altura?:'))
        if idade >=21:
            print('essa pessoa não cresce mais')
        else:
            print(f'Sua nova altura é :{pessoa.crescer_pessoa()}')
                
    
print('Encerrando....')

alunos = {
    '33975': 'Anuar Junior dos Santos El Rezz',
    '33994': 'Bruno Ribeiro Gonzaga',
    '33991': 'Carlos Eduardo Da Paixão Borges',
    '33990': 'Erika Reginaldo dos Santos',
    '33985': 'Frederico Soares Duraes',
    '33996': 'Henrique Leguica Ferreira',
    '33976': 'Jessica Azevedo dos Santos',
    '33995': 'Joao Pedro Barbosa Silva',
    '33981': 'Jonatan Samuel Serri de Souza',
    '33973': 'José Otávio Alves da Silva Vieira',
    '33999': 'Lourran Ayala Ribas',
    '33972': 'Luan Azevedo Mendes',
    '33982': 'Lucas Vinícius Ajpert Cosmo',
    '33984': 'Luiz Henrique Serafim de Oliveira',
    '33992': 'Matheus da Silva Corsine',
    '33997': 'Miqueias Gabriel Salvaterra Lopes',
    '33979': 'Rodrigo Ramos dos Santos',
    '33977': 'Sambegara Barero Cristaldo',
    '33988': 'Wellington Aparecido Santos Xavier'
}

notebooks_sem_nome = [
    '33983',
    '33978',
    '33998',
    '33993'
]

def verificar_notebook(numero):
    if numero in alunos:
        print(f'Notebook {numero} está atribuído a {alunos[numero]}.')
    elif numero in notebooks_sem_nome:
        print(f'Notebook {numero} está liberado para uso.')
    else:
        print(f'Número do notebook {numero} não encontrado.')

def main():
    while True:
        numero = input('Digite o número do notebook (ou "sair" para encerrar): ')
        if numero.lower() == 'sair':
            break
        verificar_notebook(numero)
        
main()        
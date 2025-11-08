""" Remover elementos de uma lista
Qualquer um dos elementos da lista pode ser removido a qualquer momento - isso é feito com uma instrução chamada del (delete). Nota: é uma instrução, não uma função.

Você precisa apontar para o elemento a ser removido - ele desaparecerá da lista e o comprimento da lista será reduzido em um.

Veja o trecho abaixo. Você consegue adivinhar qual saída ela produzirá? Execute o programa no editor e marque."""


numbers = [10, 5, 7, 2, 1]

del numbers[1]
print(len(numbers))
print(numbers)
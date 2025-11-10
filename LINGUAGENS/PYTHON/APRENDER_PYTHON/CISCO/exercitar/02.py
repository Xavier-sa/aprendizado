"""Indexando listas
Como você altera o valor de um elemento escolhido na lista?

Vamos atribuir um novo valor de 111 ao primeiro elemento na lista. Fazemos isso da seguinte forma:"""


numbers = [10, 5, 7, 2, 1]
print("Conteúdos originais da lista:", numbers)  # Imprimindo o conteúdo original da lista.
 
numbers[0] = 111
print("Novo conteúdo da lista: ", numbers)  # Conteúdo atual da lista.
 
"""E agora queremos que o valor do quinto elemento seja copiado para o segundo elemento - você consegue adivinhar como fazer isso?"""


numbers = [10, 5, 7, 2, 1]
print("Conteúdos originais da lista:", numbers)  # Imprimindo o conteúdo original da lista.
 
numbers[0] = 111
print("\nConteúdo da lista anterior:", numbers)  # Imprimindo conteúdos de listas anteriores.
 
numbers[1] = numbers[4]  # Copiando o valor do quinto elemento para o segundo.
print("Novo conteúdo da lista:", numbers)  # Printing Conteúdo atual da lista.
 
"""O valor entre parênteses que seleciona um elemento da lista é chamado de índice, enquanto a operação de seleção de um elemento da lista é conhecida como indexação.

Vamos usar a função print() para imprimir o conteúdo da lista cada vez que fizermos alterações. Isso nos ajudará a seguir cada etapa com mais cuidado e ver o que está acontecendo após uma determinada modificação de lista.

Nota: todos os índices usados até o momento são literais. Seus valores são fixos em tempo de execução, mas qualquer expressão pode ser o índice também. Isso abre muitas possibilidades."""
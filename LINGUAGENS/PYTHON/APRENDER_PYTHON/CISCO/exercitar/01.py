"""Por que precisamos de listas?

Pode ser que você precise ler, armazenar, processar e, finalmente, imprimir dezenas, talvez centenas, talvez até milhares de números. O que fazer então? Você precisa criar uma variável separada para cada valor? Você precisará passar longas horas escrevendo declarações como a abaixo?

var1 = int(input())
var2 = int(input())
var3 = int(input())
var4 = int(input())
var5 = int(input())
var6 = int(input())
:
:
 
Se você não acha que essa é uma tarefa complicada, pegue um pedaço de papel e escreva um programa que:

lê cinco números;
os imprime em ordem do menor para o maior (Observe bem, esse tipo de processamento é chamado de classificação).
Você deve achar que não tem papel suficiente para concluir a tarefa.

Até agora, você aprendeu como declarar variáveis que são capazes de armazenar exatamente um determinado valor de cada vez. Essas variáveis são chamadas de escalares por analogia com a matemática. Todas as variáveis que você usou até agora são escalares.

Pense em como seria conveniente declarar uma variável que pudesse armazenar mais de um valor. Por exemplo, uma centena ou mil ou até dez mil. Ainda seria a mesma variável, mas muito ampla e espaçosa. Soa atraente? Talvez, mas como ele lidaria com um contêiner tão cheio de valores diferentes? Como ela escolheria a que você precisa?

E se você pudesse numerá-las? E então diga: dê-me o valor número 2; atribua o valor número 15; aumente o número do valor 10000.

Mostraremos como declarar essas variáveis de vários valores. Faremos isso com o exemplo que acabamos de sugerir. Vamos escrever um programa que classifica uma sequência de números. Não seremos particularmente ambiciosos - assumiremos que há exatamente cinco números.

Vamos criar uma variável chamada numbers; ela é atribuída com não apenas um número, mas é preenchida com uma lista composta por cinco valores (nota: a lista começa com um colchete aberto e termina com um colchete fechado; o espaço entre os colchetes é preenchido com cinco números separados por vírgulas).

numbers = [10, 5, 7, 2, 1]
 
Digamos o mesmo usando a terminologia adequada: numbers são uma lista que consiste em cinco valores, todos eles números. Também podemos dizer que essa declaração cria uma lista de comprimento igual a cinco (pois há cinco elementos dentro dela).

Os elementos em uma lista podem ter tipos diferentes. Alguns deles podem ser números inteiros, outros carros alegóricos e outros ainda podem ser listas.

Python adotou uma convenção afirmando que os elementos em uma lista são sempre numerados começando do zero. Isso significa que o item armazenado no início da lista terá o número zero. Como há cinco elementos em nossa lista, o último deles é atribuído o número quatro. Não se esqueça:

Você vai se acostumar em breve, e isso vai se tornar natural.

Antes de prosseguirmos na discussão, precisamos declarar o seguinte: nossa lista é uma coleção de elementos, mas cada elemento é um escalar."""
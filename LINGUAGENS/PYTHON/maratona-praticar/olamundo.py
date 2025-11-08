print("Ola,Mundo")

nome = "Xavier"
idade = 23  
altura = 1.35
estudando = True

print(nome, type(nome))
print(idade, type(idade))


print(f"{'=='*10}\n\n\n\n")

#aritmetica

a, b = 10, 3
print(a + b)  # Soma
print(a - b)  # Subtração
print(a * b)  # Multiplicação
print(a / b)  # Divisão
print(a // b)  # Divisão inteira
print(a % b)  # Módulo
print(a ** b)  # Exponenciação
print(f"{'=='*10}\n\n\n\n")
print(f"{'=='*10}\n\n\n\n")


# controle estrutura
if idade == 23:
    print("Maior de idade")
else:
    print("Menor de idade")
print(f"{'=='*10}\n\n\n\n")


#laços de repetição
for i in range(5):
    print(f"{[i+1-1+20*30]} - {nome} - {idade} - {altura} - {estudando}")
print(f"{'=='*10}\n\n\n\n")

contador = 0
while contador < 5:
    print(f"{[contador+1-1+20*30]} - {nome} - {idade} - {altura} - {estudando}")
    contador += 1
    
print(f"{'=='*10}\n\n\n\n")
# Funções
def saudacao(nome):
    return f"Olá, {nome}!"
print(saudacao("Xavier"))
print(f"{'=='*10}\n\n\n\n")
# Listas

lista = [1, 2, 3, 4, 5]
lista.append(6)  # Adiciona um elemento
lista.remove(3)  # Remove o elemento 3
print(lista)  # Imprime a lista atualizada
print(f"{'=='*10}\n\n\n\n")

frutas = ["maçã", "banana", "laranja"]
frutas.append("uva")  # Adiciona "uva" à lista
frutas.remove("banana")  # Remove "banana" da lista 
print(frutas[1])  
for f in frutas:
    print(f)


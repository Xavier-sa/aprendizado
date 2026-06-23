
'''# #!O que é um Decorador?
Um decorador é uma função que recebe outra função como argumento e 
retorna uma nova função que geralmente estende o comportamento da função original.

#!Exemplo Básico de Decorador
Vamos começar com um exemplo simples de como criar e usar um decorador.'''




# Decorador que imprime uma mensagem antes e depois da execução da função
def meu_decorator(func):
    def wrapper(*args, **kwargs):
        print("Antes da execução da função.")
        resultado = func(*args, **kwargs)
        print("Depois da execução da função.")
        return resultado
    return wrapper

# Função para ser decorada
@meu_decorator
def diga_ola(nome):
    print(f"Olá, {nome}!")

# Chamar a função decorada
diga_ola("Goku e Guerreiros Z")


'''##!Explicação
meu_decorator(func): Esta é a função decoradora que 
aceita uma função func como argumento.
wrapper(*args, **kwargs): Esta é a função interna que
adiciona comportamentos antes e depois da
execução da função original.

@meu_decorator: Este é o sintagma de decoração aplicado
à função diga_ola. Ele faz com que diga_ola seja passado 
para meu_decorator e substituído pela função wrapper.'''
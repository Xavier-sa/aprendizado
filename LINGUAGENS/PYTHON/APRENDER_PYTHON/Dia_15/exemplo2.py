# Decorador que imprime uma mensagem personalizada
def repetir_vezes(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

# Função para ser decorada
@repetir_vezes(3)
def saudacao(nome):
    print(f"Olá, {nome}!")

# Chamar a função decorada
saudacao("Vegeta")

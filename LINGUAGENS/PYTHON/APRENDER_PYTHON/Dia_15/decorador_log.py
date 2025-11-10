def log_decorator(func):
    def wrapper(*args, **kwargs):
        # Registra os argumentos
        print(f"Chamando {func.__name__} com argumentos: {args}, {kwargs}")
        resultado = func(*args, **kwargs)
        # Registra o resultado
        print(f"{func.__name__} retornou: {resultado}")
        return resultado
    return wrapper

# Teste do decorador de log
@log_decorator
def soma(a, b):
    return a + b

@log_decorator
def saudacao(nome, saudacao='Olá'):
    return f"{saudacao}, {nome}!"

# Chamadas de teste
soma(5, 3)
saudacao('Goku', saudacao='Oi')
saudacao('Freeza',saudacao='Lixo')

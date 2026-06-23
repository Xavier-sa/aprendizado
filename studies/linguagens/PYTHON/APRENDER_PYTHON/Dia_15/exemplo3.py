import time

# Decorador para medir o tempo de execução
def medir_tempo(func):
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fim = time.time()
        print(f"Tempo de execução: {fim - inicio:.4f} segundos")
        return resultado
    return wrapper

# Função para ser decorada
@medir_tempo
def longa_execucao():
    time.sleep(2)  # Simula uma tarefa demorada

# Chamar a função decorada
longa_execucao()

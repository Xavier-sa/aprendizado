# Exemplo de Gerenciadores de Contexto em Python

# Exemplo 1: Manipulação de Arquivos com 'with'
print("Exemplo 1: Manipulação de Arquivos com 'with'")
with open('exemplo.txt', 'r') as arquivo:
    conteudo = arquivo.read()
    print(conteudo)
# O arquivo será fechado automaticamente ao sair do bloco 'with'
print("\n" + "-"*30)

# Exemplo 2: Gerenciador de Contexto Customizado
print("Exemplo 2: Gerenciador de Contexto Customizado")
class MeuGerenciador:
    def __enter__(self):
        print("Entrando no contexto")
        # Aqui, podemos alocar recursos, se necessário
        return self  # Pode retornar qualquer coisa, que será atribuído à variável após o 'as'

    def __exit__(self, exc_type, exc_value, traceback):
        print("Saindo do contexto")
        # Aqui, podemos liberar recursos ou realizar a limpeza
        if exc_type is not None:
            print(f"Uma exceção ocorreu: {exc_value}")
        # Retorna False se quisermos propagar a exceção (se houver), ou True para suprimir a exceção
        return False

# Usando o gerenciador de contexto personalizado
with MeuGerenciador() as gerenciador:
    print("Dentro do contexto")
    # Se quisermos, podemos gerar uma exceção para testar o comportamento
    # raise ValueError("Algo deu errado!")
print("\n" + "-"*30)

# Exemplo 3: Gerenciador de Contexto para Conexão de Banco de Dados
print("Exemplo 3: Gerenciador de Contexto para Conexão de Banco de Dados")
class ConexaoBanco:
    def __enter__(self):
        print("Conectando ao banco de dados...")
        # Aqui simularíamos a criação de uma conexão com o banco de dados
        self.conexao = "Conexão com o banco de dados aberta"
        return self.conexao  # O valor retornado é o que será atribuído à variável após 'as'

    def __exit__(self, exc_type, exc_value, traceback):
        print("Fechando a conexão com o banco de dados...")
        # Aqui liberaríamos os recursos ou fechamos a conexão
        self.conexao = None
        if exc_type is not None:
            print(f"Uma exceção ocorreu: {exc_value}")
        return False  # Propaga a exceção, caso tenha ocorrido

# Usando o gerenciador de contexto para conexão com o banco
with ConexaoBanco() as conexao:
    print(conexao)  # Usamos a conexão simulada
    # Aqui você faria operações no banco de dados
    # Para testar a exceção, podemos descomentar a linha abaixo:
    # raise ValueError("Erro na operação do banco")
print("\n" + "-"*30)

# Exemplo 4: Gerenciador de Contexto Usando Decoradores
print("Exemplo 4: Gerenciador de Contexto Usando Decoradores")
from contextlib import contextmanager

@contextmanager
def meu_gerenciador():
    print("Entrando no contexto")
    try:
        yield "Recurso alocado"  # Pode retornar qualquer valor que será atribuído ao 'as'
    finally:
        print("Saindo do contexto")
        # Aqui você pode liberar recursos, se necessário

# Usando o gerenciador de contexto com o decorador
with meu_gerenciador() as recurso:
    print(f"Dentro do contexto: {recurso}")
print("\n" + "-"*30)

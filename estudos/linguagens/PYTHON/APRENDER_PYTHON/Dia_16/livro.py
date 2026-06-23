class Livro:
    def __init__(self, titulo, autor):
        self.titulo = titulo
        self.autor = autor
        self.lido = False

    def marcar_lido(self):
        self.lido = True
        return f"{self.titulo} foi marcado como lido."

# Criando um objeto da classe Livro
livro1 = Livro("o Home mais rico da babilona", "George S. Clason")
print(livro1.marcar_lido())

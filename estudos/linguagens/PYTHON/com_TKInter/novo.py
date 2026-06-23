import tkinter as tk
from tkinter import messagebox

class Estoque:
    def __init__(self):
        self.produtos = {}

    def adicionar_produto(self, nome, quantidade):
        if nome in self.produtos:
            self.produtos[nome] += quantidade
        else:
            self.produtos[nome] = quantidade

    def remover_produto(self, nome, quantidade):
        if nome in self.produtos and self.produtos[nome] >= quantidade:
            self.produtos[nome] -= quantidade
            if self.produtos[nome] == 0:
                del self.produtos[nome]
        else:
            messagebox.showwarning("Erro", "Produto insuficiente ou não existe.")

    def gerar_venda(self, nome, quantidade):
        self.remover_produto(nome, quantidade)

    def relatorio_vendas(self):
        return self.produtos

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Sistema de Estoque")
        self.estoque = Estoque()
        
        # Widgets
        self.label_nome = tk.Label(root, text="Nome do Produto:")
        self.label_nome.pack()
        self.entry_nome = tk.Entry(root)
        self.entry_nome.pack()

        self.label_quantidade = tk.Label(root, text="Quantidade:")
        self.label_quantidade.pack()
        self.entry_quantidade = tk.Entry(root)
        self.entry_quantidade.pack()

        self.btn_adicionar = tk.Button(root, text="Adicionar Produto", command=self.adicionar_produto)
        self.btn_adicionar.pack()

        self.btn_remover = tk.Button(root, text="Remover Produto", command=self.remover_produto)
        self.btn_remover.pack()

        self.btn_venda = tk.Button(root, text="Gerar Venda", command=self.gerar_venda)
        self.btn_venda.pack()

        self.btn_relatorio = tk.Button(root, text="Relatório de Vendas", command=self.mostrar_relatorio)
        self.btn_relatorio.pack()

    def adicionar_produto(self):
        nome = self.entry_nome.get()
        quantidade = int(self.entry_quantidade.get())
        self.estoque.adicionar_produto(nome, quantidade)
        messagebox.showinfo("Sucesso", f"Produto '{nome}' adicionado com sucesso!")

    def remover_produto(self):
        nome = self.entry_nome.get()
        quantidade = int(self.entry_quantidade.get())
        self.estoque.remover_produto(nome, quantidade)
        messagebox.showinfo("Sucesso", f"Produto '{nome}' removido com sucesso!")

    def gerar_venda(self):
        nome = self.entry_nome.get()
        quantidade = int(self.entry_quantidade.get())
        self.estoque.gerar_venda(nome, quantidade)
        messagebox.showinfo("Sucesso", f"Venda de '{quantidade}' de '{nome}' gerada com sucesso!")

    def mostrar_relatorio(self):
        relatorio = self.estoque.relatorio_vendas()
        relatorio_str = "\n".join([f"{nome}: {quantidade}" for nome, quantidade in relatorio.items()])
        messagebox.showinfo("Relatório de Vendas", relatorio_str or "Nenhum produto no estoque.")

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()

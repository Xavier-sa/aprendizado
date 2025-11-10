darimport tkinter as tk
from tkinter import messagebox  

class Cachorro:
    def __init__(self, cor, corolhos, altura, comprimento, peso):
        self.cor = cor
        self.corolhos = corolhos
        self.altura = altura
        self.comprimento = comprimento
        self.peso = peso
        
    def latir(self):
        messagebox.showinfo("Latir", "Uau-Uau")
        
    def correr(self):
        messagebox.showinfo("Correr", "O cachorro correu!")
        
    def sentar(self):
        messagebox.showinfo("Sentar", "O cachorro sentou!")
        
    def comer(self):
        messagebox.showinfo("Comer", "O cachorro comeu")
        
    def exibir_informacoes_cachorro(self):
        return f'Cor: {self.cor}\nCor dos olhos: {self.corolhos}\nAltura: {self.altura}\nComprimento: {self.comprimento}\nPeso: {self.peso}'

def latir_cachorro():
    cachorro.latir()
    
def correr_cachorro():
    cachorro.correr()
    
def sentar_cachorro():
    cachorro.sentar()
    
def comer_cachorro():
    cachorro.comer()
    
def exibir_info_cachorro():
    info_cachorro = cachorro.exibir_informacoes_cachorro()
    label_info.config(text=info_cachorro)

cachorro = Cachorro('Marrom', 'Verde', 22, 33, 15)

root = tk.Tk()
root.title("Cachorro")

label_title = tk.Label(root, text="Informações do Cachorro", font=("Arial", 14, "bold"))
label_title.pack(pady=10)

label_info = tk.Label(root, text="", font=("Arial", 12))
label_info.pack(pady=10)

button_latir = tk.Button(root, text="Latir", command=latir_cachorro)
button_latir.pack(pady=5)

button_correr = tk.Button(root, text="Correr", command=correr_cachorro)
button_correr.pack(pady=5)

button_sentar = tk.Button(root, text="Sentar", command=sentar_cachorro)
button_sentar.pack(pady=5)

button_comer = tk.Button(root, text="Comer", command=comer_cachorro)
button_comer.pack(pady=5)

button_info = tk.Button(root, text="Exibir Informações", command=exibir_info_cachorro)
button_info.pack(pady=10)

root.mainloop()

print("Hello, World!")

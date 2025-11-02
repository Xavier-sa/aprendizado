import tkinter as tk

# 1. Cria a janela principal
root = tk.Tk()

# Define o título da janela
root.title("Loja Online - Rotas")

# Define um tamanho inicial para a janela (Largura x Altura)
root.geometry("400x300")

# 2. Configura a cor de fundo (Background)
# Os botões de minimizar, maximizar e fechar
# são automaticamente adicionados pelo seu sistema operacional.
root.configure(background='#1c1c1c') # Um cinza escuro

# 3. Cria um rótulo com cor de texto (Foreground)
label = tk.Label(root, text="ROTAS ON", bg="#1c1c1c", fg="#AEFF40", font=("Arial", 24)) 
label.pack(pady=50) # Adiciona padding vertical

# Inicia o loop da aplicação
root.mainloop()
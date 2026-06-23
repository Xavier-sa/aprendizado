import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk  # Para carregar JPG e redimensionar

# Dicionário com pacotes e caminhos das imagens
pacotes = {
    "Rio de Janeiro": {
        "valor": 2500,
        "passeios": ["Cristo Redentor", "Praia de Copacabana", "Pão de Açúcar"],
        "imagem": "rio.png"
    },
    "Tokyo": {
        "valor": 3500,
        "passeios": ["Monte Fuji", "Anime Museum", "Templo Senso-ji"],
        "imagem": "tokyo.png"
    },
    "Paris": {
        "valor": 5000,
        "passeios": ["Torre Eiffel", "Museu do Louvre", "Palácio de Versailles"],
        "imagem": "paris.png"
    }
}

def atualizar_passeios(event):
    destino = combo_destino.get()
    for widget in frame_passeios.winfo_children():
        widget.destroy()

    if destino in pacotes:
        opcoes = pacotes[destino]["passeios"]
        for i, passeio in enumerate(opcoes):
            check = tk.Checkbutton(frame_passeios, text=passeio, variable=vars_passeios[i])
            check.pack(anchor='w')

        # Atualizar imagem
        caminho = pacotes[destino]["imagem"]
        imagem = Image.open(caminho)
        imagem = imagem.resize((200, 150))  # redimensionar
        img_tk = ImageTk.PhotoImage(imagem)
        label_imagem.config(image=img_tk)
        label_imagem.image = img_tk  # manter referência para não perder a imagem

def mostrar_resumo():
    destino = combo_destino.get()
    if destino not in pacotes:
        messagebox.showwarning("Erro", "Escolha um destino válido.")
        return

    valor = pacotes[destino]["valor"]
    passeios = pacotes[destino]["passeios"]
    escolhidos = [p for i, p in enumerate(passeios) if vars_passeios[i].get()]

    resumo = f"Destino: {destino}\nValor: R$ {valor}\nPasseios:"
    for passeio in escolhidos:
        resumo += f"\n- {passeio}"
    messagebox.showinfo("Resumo da Compra", resumo)

# Interface
janela = tk.Tk()
janela.title("Pacotes de Viagem")
janela.geometry("420x500")

tk.Label(janela, text="Escolha seu destino:").pack(pady=5)
combo_destino = ttk.Combobox(janela, values=list(pacotes.keys()))
combo_destino.pack()
combo_destino.bind("<<ComboboxSelected>>", atualizar_passeios)

# Imagem do destino
label_imagem = tk.Label(janela)
label_imagem.pack(pady=10)

# Passeios
frame_passeios = tk.LabelFrame(janela, text="Passeios disponíveis")
frame_passeios.pack(pady=5, fill="both", expand=True)
vars_passeios = [tk.BooleanVar() for _ in range(3)]

# Botão
tk.Button(janela, text="Confirmar Compra", command=mostrar_resumo).pack(pady=10)

janela.mainloop()

import tkinter as tk
from tkinter import ttk

class GitCommandsView(tk.Tk):
    def __init__(self, controller):
        super().__init__()
        self.controller = controller
        self.title("Explicação dos Comandos Git")
        self.geometry("800x600")
        
        
        self.canvas = tk.Canvas(self)
        self.scrollbar = ttk.Scrollbar(self, orient="vertical", command=self.canvas.yview)
        self.scrollable_frame = ttk.Frame(self.canvas)
        
        
        self.scrollable_frame.bind(
            "<Configure>",
            lambda e: self.canvas.configure(
                scrollregion=self.canvas.bbox("all")
            )
        )
        self.canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")
        self.canvas.pack(side="left", fill="both", expand=True)
        self.scrollbar.pack(side="right", fill="y")
        self.canvas.configure(yscrollcommand=self.scrollbar.set)


        self.create_widgets()

    def create_widgets(self):

        title = tk.Label(self.scrollable_frame, text="Explicação dos Comandos Git", font=("Arial", 16, "bold"), bg="#e0e0e0", padx=10, pady=10, anchor='center')
        title.pack(fill='x', pady=10)


        self.load_commands()

    def load_commands(self):
        commands = self.controller.get_commands()
        
        for command, explanation in commands.items():

            frame = ttk.Frame(self.scrollable_frame, padding="10", borderwidth=2, relief="solid")
            frame.pack(fill="x", padx=10, pady=5)


            command_label = tk.Label(frame, text=f"Comando: {command}", font=("Arial", 12, "bold"), bg="#d0f0c0", anchor="w", padx=5)
            command_label.pack(fill="x")


            explanation_label = tk.Label(frame, text=f"Descrição: {explanation}", font=("Arial", 10), bg="#f0f8ff", anchor="w", padx=5)
            explanation_label.pack(fill="x")

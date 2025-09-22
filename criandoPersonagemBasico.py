class Character:
    def __init__(self, nickname, email, password):
        # --- Informações básicas ---
        self.id = 1  # Por enquanto, só número fixo
        self.nickname = nickname
        self.email = email
        self.password = password

        # --- Atributos principais ---
        self.level = 1
        self.latent_power = 10
        self.combat_power = 10
        self.strength = 5
        self.speed = 5
        self.regeneration = 5
        self.vitality = 5

        # --- Poderes especiais ---
        self.special_powers = {
            "forca_ampliada": False,
            "regeneracao_ampliada": False,
            "velocidade_ampliada": False
        }

    # Mostrar informações
    def show_basic_info(self):
        print("\n=== INFORMAÇÕES BÁSICAS ===")
        print("ID:", self.id)
        print("Nickname:", self.nickname)
        print("Email:", self.email)
        print("Level:", self.level)
        print("Poder Latente:", self.latent_power)
        print("Poder de Combate:", self.combat_power)

    def show_attributes(self):
        print("\n=== ATRIBUTOS ===")
        print("Força:", self.strength)
        print("Velocidade:", self.speed)
        print("Regeneração:", self.regeneration)
        print("Vitalidade:", self.vitality)

    def show_special_powers(self):
        print("\n=== PODERES ESPECIAIS ===")
        for power, active in self.special_powers.items():
            status = "Ativo" if active else "Inativo"
            print(power.replace("_", " ").title() + ":", status)


# --- Exemplo de uso ---
personagem = Character("ShadowX", "shadow@example.com", "123456")

# Mostrar informações
personagem.show_basic_info()
personagem.show_attributes()
personagem.show_special_powers()

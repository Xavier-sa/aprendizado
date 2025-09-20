from dataclasses import dataclass, field
from typing import Dict
import uuid

@dataclass
class Character:
    # --- Informações básicas ---
    nickname: str
    email: str
    password: str
    id: str = field(default_factory=lambda: str(uuid.uuid4()))

    # --- Atributos principais ---
    level: int = 1
    latent_power: int = 10       # poder latente (potencial)
    combat_power: int = 10       # poder de combate atual
    strength: int = 5
    speed: int = 5
    regeneration: int = 5
    vitality: int = 5

    # --- Poderes especiais ---
    special_powers: Dict[str, bool] = field(default_factory=lambda: {
        "forca_ampliada": False,
        "regeneracao_ampliada": False,
        "velocidade_ampliada": False
    })

    # --- Métodos para exibir informações formatadas ---
    def show_basic_info(self):
        print("\n=== INFORMAÇÕES BÁSICAS ===")
        print(f"ID: {self.id}")
        print(f"Nickname: {self.nickname}")
        print(f"Email: {self.email}")
        print(f"Level: {self.level}")
        print(f"Poder Latente: {self.latent_power}")
        print(f"Poder de Combate: {self.combat_power}")

    def show_attributes(self):
        print("\n=== ATRIBUTOS ===")
        print(f"Força: {self.strength}")
        print(f"Velocidade: {self.speed}")
        print(f"Regeneração: {self.regeneration}")
        print(f"Vitalidade: {self.vitality}")

    def show_special_powers(self):
        print("\n=== PODERES ESPECIAIS ===")
        for power, active in self.special_powers.items():
            status = "Ativo" if active else "Inativo"
            print(f"{power.replace('_',' ').title()}: {status}")

# --- Exemplo de uso ---
personagem = Character(
    nickname="ShadowX",
    email="shadow@example.com",
    password="123456"
)

# Exibindo dados formatados
personagem.show_basic_info()
personagem.show_attributes()
personagem.show_special_powers()

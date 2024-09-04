def get_character_name(id):
    
    characters = {
        1: "Goku",
        2: "Vegeta",
        3: "Gohan",
        4: "Piccolo",
        5: "Broly"
    }
    return characters.get(id, "Personagem desconhecido")


print(f"1: Goku\n2: Vegeta\n3: Gohan\n4: Piccolo\n5: Broly")
character_id = int(input("Escolha o número do  personagem (1-5):\n"))
print(f"Personagem com ID {character_id}: {get_character_name(character_id)} ")

def add_character(characters_list, new_character):
    
    characters_list.append(new_character)
    
    return characters_list

characters = ["Goku", "Vegeta"]

new_character = str(input("Quem deseja adicionar?:\n"))

updated_characters = add_character(characters, new_character)

print("Lista atualizada de personagens:")

print(updated_characters)

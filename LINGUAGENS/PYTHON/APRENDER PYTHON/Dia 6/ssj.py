def can_transform_to_super_saiyan(power_level):
    
    threshold = 10000 # threshold = limite
    return power_level >= threshold



power_level = int(input("Poder atual?"))
if can_transform_to_super_saiyan(power_level):
    print("O personagem pode se transformar em Super Saiyan!")
else:
    print("O personagem não pode se transformar em Super Saiyan.")

def calculate_power_level(base_power, bonus):
    return base_power + bonus

base_power = int(input("Qual poder atual?\n"))

bonus = 1000

total_power = calculate_power_level(base_power, bonus)


if total_power >= 7999:
    print("é mais de 8000 seu verme insolete!")
    print(f"Poder de combate total: {total_power}")
    
else:
    print("é um verme!")
    

        
        


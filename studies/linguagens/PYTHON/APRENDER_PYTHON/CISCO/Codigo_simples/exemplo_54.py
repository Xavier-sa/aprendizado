print("The break instrução:")
for i in range (1,6):
    if i == 3:
        break
    print("DENTRO DO LAÇO.",i)
print("FORA DO LOOP.")

print("The continue instrução:")
for i in range(1,6):
    if i == 3:
        continue 
    print("DENTRO DO LAÇO.",i)
print("FORA DO LOOP.")    
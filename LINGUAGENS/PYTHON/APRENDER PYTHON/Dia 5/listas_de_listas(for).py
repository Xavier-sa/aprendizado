 #! Organizar colunas e linhas
 # 
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [12,0, 13]
]

for linha in matriz:
    for elemento in linha:
        print(elemento, end=" ")
    print()



linha_coluna = [
    ['-', 'X', '-'],
    ['-', 'A', '-'],
    ['-', 'V', '-'],
    ['-', 'I', '-'],
    ['-', 'E', '-'],
    ['-', 'R', '-']
]

print("\nMatriz de Letras:")
for linha in linha_coluna:
    for coluna in linha:
        print(f"{coluna:4}", end=" ")  
    print()
    
    
    

riqueza = [
    ['-', 'K', '-'],
    ['-', 'A', '-'],
    ['-', 'K', '-'],
    ['-', 'A', '-'],
    ['-', 'R', '-'],
    ['-', 'O', '-'],
    ['-', 'O', '-'],
    ['-', 'T', '-'],
    ['-', 'O', '-'],
    ['-', ' ', '-'],
    ['-', '|', '-'],
    ['-', 'D', '-'],
    ['-', 'B', '-'],
    ['-', 'Z', '-'],
    ['-', '|', '-']
]

print("\nFormar palavras :")
for quqluer_coisa in riqueza:
    for coluna in quqluer_coisa:
        print(f"{coluna:4}", end=" ")  
    print()
    

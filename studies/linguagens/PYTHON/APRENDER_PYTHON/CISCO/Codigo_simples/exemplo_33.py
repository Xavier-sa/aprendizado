
"""retirar caracteres de textos util"""


text = "pyxpyxpyx"
for letter in text:
    if letter == "x":
        continue
    print(letter, end="")
 

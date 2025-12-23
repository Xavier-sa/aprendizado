import os

def gerar_symbols(diretorio=r'C:\Users\USER\Documents\RASCUNHO DOS GITS\aprendizado\Dio\public\jogo-memoria-yugi\img'):
    # Lista só arquivos png e bmp
    arquivos = [f for f in os.listdir(diretorio) if f.lower().endswith(('.png', '.bmp'))]

    # Formata para 'nome.tipo'
    lines = [f"  '{arquivo}'" for arquivo in arquivos]

    # Gera saída JS
    resultado = "const symbols = [\n" + ",\n".join(lines) + "\n];"

    return resultado

if __name__ == "__main__":
    pasta = r'C:\Users\USER\Documents\RASCUNHO DOS GITS\aprendizado\Dio\public\jogo-memoria-yugi\img' 
    saida = gerar_symbols(pasta)
    print(saida)

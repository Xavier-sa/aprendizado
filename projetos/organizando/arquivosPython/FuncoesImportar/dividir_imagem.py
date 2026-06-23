import os
from PIL import Image

def escolher_imagem():
    """Permite ao usuário escolher a imagem para dividir."""
    caminho = input("Digite o caminho da imagem que deseja dividir: ").strip()
    
    # Verificar se o arquivo existe
    if not os.path.isfile(caminho):
        print("Arquivo não encontrado. Tente novamente.")
        return escolher_imagem()
    
    # Verificar se é uma imagem
    try:
        Image.open(caminho).verify()
        return caminho
    except:
        print("Arquivo não é uma imagem válida. Tente novamente.")
        return escolher_imagem()

def escolher_direcao():
    """Permite ao usuário escolher como dividir a imagem."""
    print("\nComo deseja dividir a imagem?")
    print("1. Verticalmente (esquerda/direita)")
    print("2. Horizontalmente (cima/baixo)")
    
    opcao = input("Escolha (1 ou 2): ").strip()
    
    if opcao == "1":
        return "vertical"
    elif opcao == "2":
        return "horizontal"
    else:
        print("Opção inválida. Tente novamente.")
        return escolher_direcao()

def dividir_imagem(caminho_imagem, direcao="vertical"):
    """Divide a imagem no meio na direção especificada."""
    
    # Abrir a imagem
    img = Image.open(caminho_imagem)
    largura, altura = img.size
    
    # Obter informações do arquivo original
    nome_base = os.path.splitext(os.path.basename(caminho_imagem))[0]
    extensao = os.path.splitext(caminho_imagem)[1]
    diretorio = os.path.dirname(caminho_imagem)
    
    if direcao == "vertical":
        # Calcular ponto de divisão vertical
        meio = largura // 2
        
        # Cortar as duas metades
        parte_esquerda = img.crop((0, 0, meio, altura))
        parte_direita = img.crop((meio, 0, largura, altura))
        
        # Salvar as partes
        caminho_esquerda = os.path.join(diretorio, f"{nome_base}_esquerda{extensao}")
        caminho_direita = os.path.join(diretorio, f"{nome_base}_direita{extensao}")
        
        parte_esquerda.save(caminho_esquerda)
        parte_direita.save(caminho_direita)
        
        return caminho_esquerda, caminho_direita
    
    else:  # horizontal
        # Calcular ponto de divisão horizontal
        meio = altura // 2
        
        # Cortar as duas metades
        parte_cima = img.crop((0, 0, largura, meio))
        parte_baixo = img.crop((0, meio, largura, altura))
        
        # Salvar as partes
        caminho_cima = os.path.join(diretorio, f"{nome_base}_cima{extensao}")
        caminho_baixo = os.path.join(diretorio, f"{nome_base}_baixo{extensao}")
        
        parte_cima.save(caminho_cima)
        parte_baixo.save(caminho_baixo)
        
        return caminho_cima, caminho_baixo

def mostrar_previa(caminho_imagem, direcao):
    """Mostra informações sobre a imagem antes de dividir."""
    img = Image.open(caminho_imagem)
    largura, altura = img.size
    
    print(f"\n📊 Informações da imagem:")
    print(f"   Nome: {os.path.basename(caminho_imagem)}")
    print(f"   Tamanho: {largura} × {altura} pixels")
    print(f"   Formato: {img.format}")
    print(f"   Modo: {img.mode}")
    
    if direcao == "vertical":
        print(f"\n🔪 Divisão vertical: {largura//2} pixels para cada lado")
    else:
        print(f"\n🔪 Divisão horizontal: {altura//2} pixels para cada parte")
    
    return input("\nContinuar? (s/n): ").strip().lower() == 's'

def main():
    print("=== DIVISOR DE IMAGENS ===\n")
    print("Divida imagens ao meio vertical ou horizontalmente\n")
    
    # Escolher imagem
    caminho_imagem = escolher_imagem()
    
    # Escolher direção
    direcao = escolher_direcao()
    
    # Mostrar prévia
    if not mostrar_previa(caminho_imagem, direcao):
        print("Operação cancelada.")
        return
    
    # Dividir imagem
    print("\nDividindo imagem...")
    parte1, parte2 = dividir_imagem(caminho_imagem, direcao)
    
    print("\n✅ Imagem dividida com sucesso!")
    print(f"📄 Parte 1: {os.path.basename(parte1)}")
    print(f"📄 Parte 2: {os.path.basename(parte2)}")
    
    # Perguntar se deseja ver as imagens
    if input("\nDeseja abrir as imagens divididas? (s/n): ").strip().lower() == 's':
        try:
            Image.open(parte1).show()
            Image.open(parte2).show()
        except:
            print("Não foi possível abrir as imagens.")

if __name__ == "__main__":
    main()
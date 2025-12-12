import os
from PIL import Image

def escolher_imagem():
    """Permite ao usuário escolher a imagem para redimensionar."""
    caminho = input("Digite o caminho da imagem que deseja redimensionar: ").strip()
    
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

def verificar_proporcoes(largura_original, altura_original, largura_nova, altura_nova):
    """Verifica se o redimensionamento manterá as proporções."""
    proporcao_original = largura_original / altura_original
    proporcao_nova = largura_nova / altura_nova
    
    print(f"\n📐 Proporções:")
    print(f"   Original: {largura_original}×{altura_original} (proporção: {proporcao_original:.2f})")
    print(f"   Nova: {largura_nova}×{altura_nova} (proporção: {proporcao_nova:.2f})")
    
    if abs(proporcao_original - proporcao_nova) > 0.1:
        print("⚠️  ATENÇÃO: As proporções são diferentes!")
        print("   A imagem será distorcida para caber nas novas dimensões.")
        return False
    else:
        print("✅ Proporções similares - sem distorção significativa.")
        return True

def escolher_modo_redimensionamento():
    """Permite escolher como lidar com proporções diferentes."""
    print("\n📏 Modos de redimensionamento:")
    print("1. Distorcer para caber exatamente em 771×180 (padrão)")
    print("2. Manter proporções e preencher com cor sólida")
    print("3. Manter proporções e cortar o excesso (crop)")
    print("4. Manter proporções e adicionar bordas transparentes")
    
    opcao = input("Escolha (1-4, padrão=1): ").strip()
    
    return opcao if opcao in ['1', '2', '3', '4'] else '1'

def redimensionar_com_preenchimento(img, largura_nova, altura_nova, cor=(0, 0, 0, 0)):
    """Redimensiona mantendo proporções e preenche o restante."""
    # Calcular proporções
    proporcao_original = img.width / img.height
    proporcao_nova = largura_nova / altura_nova
    
    if proporcao_original > proporcao_nova:
        # A imagem é mais larga - ajustar pela altura
        nova_altura = altura_nova
        nova_largura = int(nova_altura * proporcao_original)
    else:
        # A imagem é mais alta - ajustar pela largura
        nova_largura = largura_nova
        nova_altura = int(nova_largura / proporcao_original)
    
    # Redimensionar mantendo proporções
    img_redimensionada = img.resize((nova_largura, nova_altura), Image.Resampling.LANCZOS)
    
    # Criar nova imagem com fundo
    nova_imagem = Image.new('RGBA', (largura_nova, altura_nova), cor)
    
    # Centralizar a imagem redimensionada
    x_offset = (largura_nova - nova_largura) // 2
    y_offset = (altura_nova - nova_altura) // 2
    
    nova_imagem.paste(img_redimensionada, (x_offset, y_offset))
    
    return nova_imagem

def redimensionar_com_crop(img, largura_nova, altura_nova):
    """Redimensiona mantendo proporções e corta o excesso."""
    # Calcular proporções
    proporcao_original = img.width / img.height
    proporcao_nova = largura_nova / altura_nova
    
    if proporcao_original > proporcao_nova:
        # A imagem é mais larga - crop nas laterais
        nova_altura = altura_nova
        nova_largura = int(nova_altura * proporcao_original)
        
        # Redimensionar
        img_redimensionada = img.resize((nova_largura, nova_altura), Image.Resampling.LANCZOS)
        
        # Cortar as laterais
        x_crop = (nova_largura - largura_nova) // 2
        img_cortada = img_redimensionada.crop((x_crop, 0, x_crop + largura_nova, altura_nova))
        
    else:
        # A imagem é mais alta - crop no topo/baixo
        nova_largura = largura_nova
        nova_altura = int(nova_largura / proporcao_original)
        
        # Redimensionar
        img_redimensionada = img.resize((nova_largura, nova_altura), Image.Resampling.LANCZOS)
        
        # Cortar topo e baixo
        y_crop = (nova_altura - altura_nova) // 2
        img_cortada = img_redimensionada.crop((0, y_crop, largura_nova, y_crop + altura_nova))
    
    return img_cortada

def redimensionar_imagem(caminho_imagem, largura_nova=771, altura_nova=180):
    """Redimensiona a imagem para as dimensões especificadas."""
    
    # Abrir a imagem
    img = Image.open(caminho_imagem)
    largura_original, altura_original = img.size
    
    # Obter informações do arquivo original
    nome_base = os.path.splitext(os.path.basename(caminho_imagem))[0]
    extensao = os.path.splitext(caminho_imagem)[1].lower()
    diretorio = os.path.dirname(caminho_imagem)
    
    # Verificar proporções
    verificar_proporcoes(largura_original, altura_original, largura_nova, altura_nova)
    
    # Escolher modo
    modo = escolher_modo_redimensionamento()
    
    # Aplicar redimensionamento conforme o modo escolhido
    if modo == '1':  # Distorcer
        img_redimensionada = img.resize((largura_nova, altura_nova), Image.Resampling.LANCZOS)
        sufixo = f"_{largura_nova}x{altura_nova}_redim"
        
    elif modo == '2':  # Preencher com cor sólida
        print("\nEscolha uma cor de fundo:")
        print("1. Preto")
        print("2. Branco")
        print("3. Cinza")
        print("4. Transparente (apenas para PNG)")
        
        cor_opcao = input("Opção (1-4): ").strip()
        
        cores = {
            '1': (0, 0, 0, 255),
            '2': (255, 255, 255, 255),
            '3': (128, 128, 128, 255),
            '4': (0, 0, 0, 0)
        }
        
        cor = cores.get(cor_opcao, (0, 0, 0, 255))
        img_redimensionada = redimensionar_com_preenchimento(img, largura_nova, altura_nova, cor)
        sufixo = f"_{largura_nova}x{altura_nova}_preenchido"
        
    elif modo == '3':  # Crop
        img_redimensionada = redimensionar_com_crop(img, largura_nova, altura_nova)
        sufixo = f"_{largura_nova}x{altura_nova}_cortado"
        
    else:  # Bordas transparentes
        img = img.convert('RGBA') if img.mode != 'RGBA' else img
        img_redimensionada = redimensionar_com_preenchimento(img, largura_nova, altura_nova, (0, 0, 0, 0))
        sufixo = f"_{largura_nova}x{altura_nova}_bordas"
    
    # Salvar a imagem redimensionada
    nome_novo = f"{nome_base}{sufixo}{extensao}"
    caminho_novo = os.path.join(diretorio, nome_novo)
    
    # Converter para RGB se for JPEG
    if extensao in ['.jpg', '.jpeg']:
        if img_redimensionada.mode == 'RGBA':
            # Criar fundo branco para imagens transparentes em JPEG
            fundo = Image.new('RGB', img_redimensionada.size, (255, 255, 255))
            fundo.paste(img_redimensionada, mask=img_redimensionada.split()[3] if img_redimensionada.mode == 'RGBA' else None)
            img_redimensionada = fundo
    
    # Salvar com qualidade otimizada
    if extensao in ['.jpg', '.jpeg']:
        img_redimensionada.save(caminho_novo, 'JPEG', quality=95, optimize=True)
    elif extensao == '.png':
        img_redimensionada.save(caminho_novo, 'PNG', optimize=True)
    else:
        img_redimensionada.save(caminho_novo)
    
    return caminho_novo

def main():
    print("=== REDIMENSIONADOR DE IMAGENS ===\n")
    print("Redimensiona imagens para 771×180 pixels\n")
    
    # Definir dimensões fixas
    LARGURA = 771
    ALTURA = 180
    
    # Escolher imagem
    caminho_imagem = escolher_imagem()
    
    # Mostrar informações iniciais
    img = Image.open(caminho_imagem)
    print(f"\n📊 Imagem original: {os.path.basename(caminho_imagem)}")
    print(f"   Tamanho: {img.width}×{img.height} pixels")
    print(f"   Para: {LARGURA}×{ALTURA} pixels")
    
    # Confirmar
    resposta = input("\nDeseja continuar? (s/n): ").strip().lower()
    if resposta != 's':
        print("Operação cancelada.")
        return
    
    # Redimensionar
    print("\nRedimensionando imagem...")
    caminho_novo = redimensionar_imagem(caminho_imagem, LARGURA, ALTURA)
    
    print("\n✅ Imagem redimensionada com sucesso!")
    print(f"📄 Nova imagem: {os.path.basename(caminho_novo)}")
    
    # Mostrar informações da nova imagem
    img_nova = Image.open(caminho_novo)
    print(f"📏 Novo tamanho: {img_nova.width}×{img_nova.height} pixels")
    
    # Perguntar se deseja ver a imagem
    if input("\nDeseja abrir a imagem redimensionada? (s/n): ").strip().lower() == 's':
        try:
            img_nova.show()
        except:
            print("Não foi possível abrir a imagem.")

if __name__ == "__main__":
    main()
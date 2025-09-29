from rembg import remove
from PIL import Image
import io

input_path = 'perfil.jpeg'
output_path = 'perfil_sem_fundo.png'

# Abrir imagem e converter para bytes
with open(input_path, 'rb') as f:
    input_bytes = f.read()

# Remover o fundo
output_bytes = remove(input_bytes)

# Converter os bytes de volta para imagem
output_image = Image.open(io.BytesIO(output_bytes))

# Salvar a imagem com fundo removido
output_image.save(output_path)

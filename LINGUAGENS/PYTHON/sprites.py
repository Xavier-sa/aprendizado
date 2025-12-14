import pygame

# Inicia o Pygame
pygame.init()

# Janela do jogo
tela = pygame.display.set_mode((500, 500))
pygame.display.set_caption("Exemplo Sprite")

# Carregar sprite sheet (uma imagem com vários frames lado a lado)
sprite_sheet = pygame.image.load("sprite_sheet.png").convert_alpha()

# Função para recortar um frame específico
def get_frame(sheet, frame, largura, altura):
    image = pygame.Surface((largura, altura), pygame.SRCALPHA)
    image.blit(sheet, (0, 0), (frame * largura, 0, largura, altura))
    return image

# Criar lista de frames
frames = [get_frame(sprite_sheet, i, 32, 32) for i in range(4)]

# Loop do jogo
clock = pygame.time.Clock()
frame_index = 0
rodando = True
while rodando:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            rodando = False

    tela.fill((0, 0, 0))
    tela.blit(frames[frame_index], (200, 200))  # desenha frame

    frame_index = (frame_index + 1) % len(frames)  # troca frame
    pygame.display.flip()
    clock.tick(10)  # velocidade da animação

pygame.quit()

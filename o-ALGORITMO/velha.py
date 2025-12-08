import pygame

pygame.init()
screen = pygame.display.set_mode((450,450))  #aqui o tamanho da caixa
pygame.display.set_caption("Xavier Praticando")

fundo = pygame.image.load('ALGORITMO/fundoteste.jpg')
circulo = pygame.image.load('ALGORITMO/0.jpg')
x = pygame.image.load('ALGORITMO/x.jpg')


# organizar

fundo = pygame.transform.scale(
    fundo,
    (450,450))
circulo =pygame.transform.scale(
    circulo,
    (75,75))

x= pygame.transform.scale(
    x, 
    (115,115))


#cordenadas e os elementos
coor =[[(0,0),(0,0),(0,0)],
       [(0,0),(0,0),(0,0)],
       [(0,0),(0,0),(0,0)]]



tabulerio = [['','',''],
             ['','',''],
             ['','','']]

turno = 'X'
game_over = False

clock = pygame.time.Clock()

while not game_over:
    clock.tick(30)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
            
    
    
    screen.blit(fundo, (0, 0))
    screen.blit(circulo, (40, 50))
    screen.blit(x, (160, 165))
    pygame.display.update()
pygame.quit()





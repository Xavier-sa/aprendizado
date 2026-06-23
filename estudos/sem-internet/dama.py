import pygame as pg
import random

TITLE = "Slot Machine Grid"
TILES_HORIZONTAL = 10
TILES_VERTICAL = 10
TILE_SIZE = 80
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 800

# Cores
BLACK = (0, 0, 0)
GRAY = (40, 40, 40)
WHITE = (255, 255, 255)
RED = (220, 20, 60)
GOLD = (255, 215, 0)
GREEN = (50, 205, 50)
BLUE = (30, 144, 255)

# Símbolos da slot machine
SYMBOLS = ['🍒', '🍋', '🍊', '⭐', '💎', '7️⃣']
SYMBOL_COLORS = [RED, (255, 255, 0), (255, 165, 0), GOLD, BLUE, GREEN]


class Symbol:
    def __init__(self, surface, grid_pos):
        self.surface = surface
        self.grid_pos = grid_pos  # (row, col)
        self.symbol_index = random.randint(0, len(SYMBOLS) - 1)
        self.spinning = False
        self.spin_speed = 0
        self.target_symbol = self.symbol_index
        
    def get_pixel_pos(self):
        x = (self.grid_pos[1] * TILE_SIZE) + TILE_SIZE // 2
        y = (self.grid_pos[0] * TILE_SIZE) + TILE_SIZE // 2
        return (x, y)
    
    def spin(self):
        self.spinning = True
        self.spin_speed = random.randint(15, 25)
        self.target_symbol = random.randint(0, len(SYMBOLS) - 1)
    
    def update(self):
        if self.spinning:
            self.spin_speed -= 0.5
            if self.spin_speed <= 0:
                self.spinning = False
                self.symbol_index = self.target_symbol
            else:
                if random.random() < 0.3:
                    self.symbol_index = random.randint(0, len(SYMBOLS) - 1)
    
    def draw(self):
        pos = self.get_pixel_pos()
        color = SYMBOL_COLORS[self.symbol_index]
        
        # Desenha círculo de fundo
        pg.draw.circle(self.surface, color, pos, 30)
        pg.draw.circle(self.surface, WHITE, pos, 30, 3)
        
        # Desenha símbolo (texto simplificado)
        font = pg.font.Font(None, 40)
        text = font.render(SYMBOLS[self.symbol_index], True, WHITE)
        text_rect = text.get_rect(center=pos)
        self.surface.blit(text, text_rect)


class Player:
    def __init__(self, surface):
        self.surface = surface
        self.pos = (40, 40)
        self.credits = 100
        self.bet = 10
        
    def draw(self):
        # Desenha indicador de posição
        pg.draw.circle(self.surface, WHITE, self.pos, 35, 3)
        pg.draw.circle(self.surface, (100, 100, 255), self.pos, 25)
        
    def move(self, target):
        x = (TILE_SIZE * (target[0] // TILE_SIZE)) + TILE_SIZE // 2
        y = (TILE_SIZE * (target[1] // TILE_SIZE)) + TILE_SIZE // 2
        self.pos = (x, y)
    
    def get_grid_pos(self):
        col = self.pos[0] // TILE_SIZE
        row = self.pos[1] // TILE_SIZE
        return (row, col)


class SlotMachine:
    def __init__(self, surface):
        self.surface = surface
        self.symbols = []
        self.spinning = False
        self.create_symbols()
        
    def create_symbols(self):
        for row in range(TILES_VERTICAL):
            for col in range(TILES_HORIZONTAL):
                symbol = Symbol(self.surface, (row, col))
                self.symbols.append(symbol)
    
    def spin_at_position(self, grid_pos):
        if not self.spinning:
            self.spinning = True
            # Gira os símbolos ao redor da posição
            for symbol in self.symbols:
                distance = abs(symbol.grid_pos[0] - grid_pos[0]) + abs(symbol.grid_pos[1] - grid_pos[1])
                if distance <= 2:  # Raio de 2 tiles
                    symbol.spin()
    
    def update(self):
        all_stopped = True
        for symbol in self.symbols:
            symbol.update()
            if symbol.spinning:
                all_stopped = False
        
        if all_stopped:
            self.spinning = False
    
    def draw(self):
        for symbol in self.symbols:
            symbol.draw()
    
    def check_win(self, player_pos):
        # Verifica linha, coluna e diagonal ao redor do jogador
        row, col = player_pos
        matches = []
        
        # Símbolos adjacentes
        for symbol in self.symbols:
            sr, sc = symbol.grid_pos
            if abs(sr - row) <= 1 and abs(sc - col) <= 1:
                matches.append(symbol.symbol_index)
        
        # Conta símbolos iguais
        if len(matches) >= 3:
            most_common = max(set(matches), key=matches.count)
            count = matches.count(most_common)
            if count >= 3:
                return count * 10  # Prêmio baseado em quantidade
        return 0


class Game:
    def __init__(self):
        pg.init()
        self.clock = pg.time.Clock()
        pg.display.set_caption(TITLE)
        self.surface = pg.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        self.loop = True
        self.player = Player(self.surface)
        self.slot_machine = SlotMachine(self.surface)
        self.font = pg.font.Font(None, 36)
        self.message = ""
        self.message_timer = 0
        
    def main(self):
        while self.loop:
            self.game_loop()
            self.clock.tick(60)
        pg.quit()
    
    def game_loop(self):
        self.surface.fill(BLACK)
        
        # Desenha grid
        for row in range(TILES_VERTICAL):
            for col in range(row % 2, TILES_HORIZONTAL, 2):
                pg.draw.rect(
                    self.surface,
                    GRAY,
                    (col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE),
                )
        
        # Atualiza e desenha slot machine
        self.slot_machine.update()
        self.slot_machine.draw()
        
        # Desenha player
        self.player.draw()
        
        # Desenha HUD
        self.draw_hud()
        
        # Event handling
        for event in pg.event.get():
            if event.type == pg.QUIT:
                self.loop = False
            elif event.type == pg.KEYDOWN:
                if event.key == pg.K_ESCAPE:
                    self.loop = False
                elif event.key == pg.K_SPACE and not self.slot_machine.spinning:
                    self.play_spin()
            elif event.type == pg.MOUSEBUTTONUP:
                pos = pg.mouse.get_pos()
                self.player.move(pos)
                if not self.slot_machine.spinning:
                    self.play_spin()
        
        # Atualiza mensagem
        if self.message_timer > 0:
            self.message_timer -= 1
            msg_surface = self.font.render(self.message, True, GOLD)
            msg_rect = msg_surface.get_rect(center=(WINDOW_WIDTH // 2, 50))
            self.surface.blit(msg_surface, msg_rect)
        
        pg.display.update()
    
    def play_spin(self):
        if self.player.credits >= self.player.bet:
            self.player.credits -= self.player.bet
            grid_pos = self.player.get_grid_pos()
            self.slot_machine.spin_at_position(grid_pos)
            
            # Verifica vitória após um pequeno delay
            pg.time.set_timer(pg.USEREVENT, 2000, 1)
        else:
            self.show_message("Sem créditos!")
    
    def draw_hud(self):
        # Créditos
        credits_text = self.font.render(f"Créditos: ${self.player.credits}", True, GOLD)
        self.surface.blit(credits_text, (10, 10))
        
        # Aposta
        bet_text = self.font.render(f"Aposta: ${self.player.bet}", True, WHITE)
        self.surface.blit(bet_text, (10, 50))
        
        # Instruções
        help_font = pg.font.Font(None, 24)
        help_text = help_font.render("Clique ou ESPAÇO para girar | ESC para sair", True, WHITE)
        self.surface.blit(help_text, (10, WINDOW_HEIGHT - 30))
    
    def show_message(self, text):
        self.message = text
        self.message_timer = 120  # 2 segundos a 60 FPS


if __name__ == "__main__":
    mygame = Game()
    mygame.main()
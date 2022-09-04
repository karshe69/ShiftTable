import pygame
import asyncio

colors = {
    "background": (50, 50, 50)
}


class Window:
    def __init__(self, width=900, height=500):
        self.surf = pygame.display.set_mode((900, 500), pygame.RESIZABLE)

    def fill(self, color):
        self.surf.fill(color)

    pygame.draw()


win = Window()


class App:
    FPS = 60
    pygame.display.set_caption("ShiftTable")

    def __init__(self):
        loop = asyncio.new_event_loop()
        self.win_draw()
        loop.call_soon(self.main_loop, loop)
        try:
            loop.run_forever()
        finally:
            loop.close()

    def win_draw(self):
        win.fill(colors["background"])
        pygame.draw.rect(win, "orange", (100, 100, 200, 200))
        pygame.display.update()

    def main_loop(self, loop):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                loop.stop()
            if event.type == pygame.VIDEORESIZE:
                print(event.size)
                self.win_draw()

        loop.call_later(1/self.FPS, self.main_loop, loop)


if __name__ == "__main__":
    App()

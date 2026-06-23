from kivymd.app import MDApp
from kivy.lang import Builder

class Relogio(MDApp):
    def build(self):
        return Builder.load_string('''
BoxLayout:
    orientation: 'vertical'
    MDLabel:
        text: 'Olá, Mundo!'
        halign: 'center'
        theme_text_color: "Secondary"
''')

if __name__ == "__main__":
    Relogio().run()
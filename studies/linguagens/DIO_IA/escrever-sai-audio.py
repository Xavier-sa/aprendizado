import pyttsx3

def texto_para_voz(texto):
    # Inicializa o motor de texto para fala
    engine = pyttsx3.init()
    
    # Define propriedades, como a taxa de fala e volume
    engine.setProperty('rate', 189)  # Taxa de fala
    engine.setProperty('volume', 1)   # Volume (0.0 a 1.0)

    # Converte texto em fala
    engine.say(texto)
    engine.runAndWait()

# Exemplo de uso
if __name__ == "__main__":
    texto = "Olá, me chamo xavier e serei um dev senior , dono de varias empresas e referencia na area tecnologica"
    texto_para_voz(texto)

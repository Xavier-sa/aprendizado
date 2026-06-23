import speech_recognition as sr
import pyttsx3
import os

def texto_para_voz(texto):
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 1)
    engine.say(texto)
    engine.runAndWait()

def ouvir_microfone():
    microfone = sr.Recognizer()
    with sr.Microphone() as source:
        print("Ajustando o ruído de fundo...")
        microfone.adjust_for_ambient_noise(source)
        print("Pode falar!")
        
        audio = microfone.listen(source)
        try:
            texto = microfone.recognize_google(audio, language='pt-BR')
            print("Você disse: " + texto)
            return texto.lower()
        except sr.UnknownValueError:
            print("Desculpe, não consegui entender.")
            return ""
        except sr.RequestError:
            print("Não consegui acessar o serviço de reconhecimento de fala.")
            return ""

def executar_comando(comando):
    if 'abrir navegador' in comando:
        texto_para_voz("Abrindo o navegador.")
        os.system("start chrome")  # ou "start firefox" dependendo do seu navegador
        
    elif 'tocar música' in comando:
        texto_para_voz("Tocando música.")
        os.system("start \"\" \"C:\\Program Files\\Windows Media Player\\wmplayer.exe\" \"c:\\Users\\Pichau\\Music\\brunoemarrone-dedin-pra-cima-412bf2bd (1).mp3\"")
        

    elif 'fechar' in comando:
        texto_para_voz("Fechando o programa.")
        exit()
    else:
        texto_para_voz("Comando não reconhecido.")

if __name__ == "__main__":
    while True:
        comando = ouvir_microfone()
        if comando:
            executar_comando(comando)

import speech_recognition as sr

# Ouve e reconhece a fala
def ouvir_microfone():
    # Habilita o microfone do usuário
    microfone = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Ajustando o ruído de fundo...")  # Ajusta o ruído de fundo
        microfone.adjust_for_ambient_noise(source)
        print("Pode falar!")
        
        # Escuta o áudio
        audio = microfone.listen(source)
        
        try:
            # Reconhece a fala usando o Google Web Speech API
            texto = microfone.recognize_google(audio, language='pt-BR')
            print("Você disse: " + texto)
        except sr.UnknownValueError:
            print("Desculpe, não consegui entender o que você disse.")
        except sr.RequestError:
            print("Não consegui acessar o serviço de reconhecimento de fala.")

# Executa a função
if __name__ == "__main__":
    ouvir_microfone()

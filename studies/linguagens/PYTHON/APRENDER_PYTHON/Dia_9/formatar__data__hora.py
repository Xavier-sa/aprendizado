from datetime import datetime

agora = datetime.now()
formato = agora.strftime("%d/%m/%Y %H:%M:%S")
print("Data e hora formatadas:", formato)

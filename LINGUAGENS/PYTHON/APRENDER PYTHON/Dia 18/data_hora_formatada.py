from datetime import datetime
agora=datetime.now()
formatada = agora.strftime("%d/%m/%Y %H:%M:%S")
print(f"Data e hora formatada:\n\t", formatada)
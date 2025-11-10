from datetime import datetime, timedelta

agora = datetime.now()
uma_semana = timedelta(weeks=1)
nova_data = agora + uma_semana
print("Data e hora uma semana depois:", nova_data)

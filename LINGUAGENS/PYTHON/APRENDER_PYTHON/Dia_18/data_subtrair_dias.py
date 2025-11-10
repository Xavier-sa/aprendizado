from datetime import datetime, timedelta

data_atual = datetime.now()

nova_data_sub = data_atual - timedelta(days=10)
print("Data após subtrair 30 dias:", nova_data_sub.strftime("%d/%m/%Y"))
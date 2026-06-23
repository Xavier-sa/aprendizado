from datetime import datetime, timedelta


data_atual = datetime.now()#!puxo a data atual


nova_data = data_atual + timedelta(days=8) # Adicionando dias, em days= seleciono a quantidade de dias que quero adicionar
print("Data atual:", data_atual.strftime("%d/%m/%Y"))
print("Data após adicionar 8 dias:", nova_data.strftime("%d/%m/%Y"))



from datetime import datetime
print(f"{'-'*50}")
#! Convertendo string para datetime

data_str = "18/10/2024 14:30"
data_obj = datetime.strptime(data_str, "%d/%m/%Y %H:%M")
print(f"Objeto datetime:\n\t\t", data_obj)
print(f"{'-'*50}")
#!Reformatando
nova_forma = data_obj.strftime("%B %d, %Y at %H:%M")
print(f"Data formatada:\n\t\t"  , nova_forma)
print(f"{'-'*50}")
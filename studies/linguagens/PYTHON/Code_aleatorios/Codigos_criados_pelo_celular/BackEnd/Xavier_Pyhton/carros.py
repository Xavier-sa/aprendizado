import json

carros_json ='{"marca":"honda","modelo":"hrv","cor":"prata"}'
    
carros= json.loads(carros_json)

print(carros["marca"])

for x in carros:
    print(x)
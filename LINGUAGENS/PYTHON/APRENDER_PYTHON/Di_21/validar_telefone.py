import re

# Função para validar número de telefone
def validar_telefone(telefone):
    # Regex para validar número de telefone no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
    padrao = r'^\(\d{2}\) \d{4,5}-\d{4}$'
    
    # Usando re.match para verificar se o número corresponde ao padrão
    if re.match(padrao, telefone):
        return True
    else:
        return False

# Teste
telefones = ["(11) 98765-4321", "(21) 1234-5678", "(22) 123-4567 " , "(67) 1254-5558"]
for telefone in telefones:
    print(f'{telefone}: {validar_telefone(telefone)}')

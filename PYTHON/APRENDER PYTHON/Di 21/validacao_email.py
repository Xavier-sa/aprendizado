import re

# Função para validar e-mail
def validar_email(email):
    # Regex para validar um e-mail
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    # Usando re.match para verificar se o e-mail corresponde ao padrão
    if re.match(padrao, email):
        return True
    else:
        return False

# Teste
emails = ["exemplo@dominio.com", "usuario@dominio", "email.com"]
for email in emails:
    print(f'{email}: {validar_email(email)}')

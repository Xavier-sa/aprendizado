login = str(input("Login:"))

senha = str(input("Senha:"))

def credencias():
    if login == "xavier" and senha == "xavier123":
        print(f'Bem Vindo {login}')
        
    else:
        print("Credencias invalidas!")
       
credencias()

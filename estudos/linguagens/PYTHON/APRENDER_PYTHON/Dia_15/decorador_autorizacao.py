def autorizacao_decorator(permissoes_necessarias):
    def decorator(func):
        def wrapper(usuario, *args, **kwargs):
            if usuario['permissao'] in permissoes_necessarias:
                print(f"Acesso concedido para {usuario['nome']}.")
                return func(usuario, *args, **kwargs)
            else:
                print(f"Acesso negado para {usuario['nome']}. Permissão necessária: {permissoes_necessarias}")
                return None
        return wrapper
    return decorator

# Definindo permissões
permissoes_admin = ['admin']
permissoes_user = ['user']

# Teste do decorador de autorização
@autorizacao_decorator(permissoes_admin)
def operacao_admin(usuario):
    return f"Operação administrativa executada por {usuario['nome']}"

@autorizacao_decorator(permissoes_user)
def operacao_usuario(usuario):
    return f"Operação de usuário executada por {usuario['nome']}"

# Testes
usuario1 = {'nome': 'Goku', 'permissao': 'admin'}
usuario2 = {'nome': 'Vegeta', 'permissao': 'user'}
usuario3 = {'nome': 'Frieza', 'permissao': 'guest'}

print(operacao_admin(usuario1))  # Deve funcionar
print(operacao_admin(usuario2))  # Deve negar
print(operacao_usuario(usuario2))  # Deve funcionar
print(operacao_usuario(usuario3))  # Deve negar

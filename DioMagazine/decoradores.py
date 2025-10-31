def dizer_oi(nome):
    return f"Oi {nome}"

def incentivar_aprender(nome):
    return f"Oi {nome}, vamos aprender Pyhton juntos!"

def mensagem_para_xavier(funcao_mensagem):
    return funcao_mensagem("XAVIER")


print(mensagem_para_xavier(dizer_oi))
print(mensagem_para_xavier(incentivar_aprender))


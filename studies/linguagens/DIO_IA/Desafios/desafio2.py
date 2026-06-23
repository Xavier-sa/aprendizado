# Recebe a Entrada do usuário e armazena na variável "entrada"
entrada = input()

# Função responsável por receber um recurso de texto e retornar sua respectiva descrição.
def identificar_recurso_texto(recurso):
    if recurso == "Sumarização":
        return "Sintetizar artigos extensos ou documentos em resumos breves"
        
    elif recurso == "Análise e interpretação de texto":
        return "Oferecer percepções e esclarecer conceitos complexos"
        
    elif recurso == "Geração de conteúdo":
        return "Desenvolver conteúdo com base em instruções ou diretrizes"
        
    elif recurso == "Redação e revisão":
        return "Auxiliar na criação de textos e revisão de materiais escritos"

    # Caso o recurso não seja reconhecido
    return "Recurso não reconhecido"

print(identificar_recurso_texto(entrada))

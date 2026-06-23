# Recebe a Entrada do usuário e armazena na variável "entrada"
entrada = input()

# Função responsável por receber uma prática e retornar sua respectiva descrição.
def identificar_pratica(pratica):
    if pratica == "Especificidade":
        return "Fornecer detalhes específicos para evitar ambiguidades"
        
    elif pratica == "Iteração":
        return "Ajustar o prompt com base no feedback recebido"
        
    elif pratica == "Clareza":
        return "Usar linguagem clara e direta"
        
    elif pratica == "Contextualização":
        return "Incluir contexto relevante para guiar a resposta"

    # Caso a prática não seja reconhecida
    return "Prática não reconhecida"

print(identificar_pratica(entrada))

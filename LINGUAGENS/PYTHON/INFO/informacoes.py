"""
Aprenda por quer ele é importante e como ele controla e execução de scripts em Python

"""


#!  if__name_== '__main__':


#O que é __name__?

"""Em python, toda vez que um arquivo é execeutado, a variável especial __name__ é definida. Se o arquivo for executado diretamente, __name__ é igual a "__main__". 
Se for importado como um módulo, __name__ será o nome do arquivo (sem a extensão.py)."""


#Exemplo 
# Se for executado diretamente: '__main__'
#! print(__name__)
    
    
    
#! O que if__name__=='__main__' faz?

""" 
A expressão if__name__== '__main__' é usada para garantir que um bloco de código só seja executado se o 
arquivo for executado se o arquivo for executado diretamente. Se o arquivo for importado como módulo, esse bloco será ignorado.

"""

# Exemplo de uso 
# if__name__=='__main__':
#     print("Este código esta sendo executado diretamente.")



#! Por que isso é útil?

# Organização: Permite separar a logica principal de um script e o que deve ser executado quando ele é importado como módulo.

# Reutilização: Você pode criar funções ou classes que podem ser reutilizadas em outros arquivos sem executar codigo desnecessario.

# Testes: Permite testar funcionalidades diretamente quando voce executa o arquivo.


# ? Exemplo Completo
# modulo.py
def saudacao():
    print("Ola, Xavier continue aprendendo")
    
if __name__=='_main_':
    saudacao()

# script.py
from mod
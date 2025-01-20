# #!    Coloquei um r antes da string que contém o logo: r"""...""".

# O que isso faz:

#     O prefixo r diz ao Python que a string é "bruta", ou seja, ele não vai tentar interpretar as sequências de escape dentro dela. Isso significa que você pode usar caracteres como \ sem que o Python tente interpretá-los como parte de uma sequência de escape.

# Agora, seu código vai funcionar exatamente como você pediu, mantendo os \* e outras barras invertidas sem gerar erros de sintaxe.




logo = r"""
            _________________________________________________________________ 
                                                                                    |*|_______________________________________|*| 
            \*\  /*/      /*\    \*\    /*/    |*|    |*|====*/    |*|***|*|        |*|                                       |*|   
             \*\/*/      / ^ \    \*\  /*/     |*|    |*|__        |*|_*/*/         |*|     wellington222688@gmail.com        |*| 
             /*/\*\     /* - *\    \*\/*/      |*|    |*|--        |*| \*\          |*| contate:67 98466-0285/67 99*********  |*| 
            /*/  \*\   /*/   \*\    \**/       |*|    |*|====*/    |*|  \*\         |*|_______________________________________|*|
            _________________________________________________________________                                                                 
                            
            Protitipo:


            Portifolio: 'https://xavierdev.pages.dev'
                        
                                
            Sugestões:
        """

saudacao = """
                SEJA BEM VINDO
                
            """

print(f'{logo}\n\n\n {saudacao}')


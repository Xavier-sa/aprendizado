'''
FAÇA UM ALGORITMO PARA CALCULAR O RESTO DA 
DIVISÃO DE UM NUMERO INTEIRO POR OUTRO,
AMBOS INFORMADOS PELO USUARIO, USANDO AS 4
OPERACOES BASICAS DA MATEMATICA APENAS.
'''
dividendo = int(input("Digite o dividendo (número a ser dividido): "))
divisor = int(input("Digite o divisor (número pelo qual será dividido): "))


quociente = dividendo // divisor  
resto = dividendo - (quociente * divisor)  


print("O resto da divisão de", dividendo, "por", divisor, "é", resto)
# Coleta e validação de número inteiro
while True:
    try:
        idade = int(input("Informe sua idade (número inteiro): "))
        break
    except ValueError:
        print("Por favor, insira um número inteiro válido.")

# Coleta e validação de número float
while True:
    try:
        altura = float(input("Informe sua altura (ex: 1.75): "))
        break
    except ValueError:
        print("Por favor, insira um valor de altura válido (use ponto, não vírgula).")

# Coleta de string (sem validação complexa)
nome = input("Informe seu nome: ").strip().title()

# Validação de resposta booleana
resposta = input("Você é dev? (SIM/NÃO): ").strip().lower()

while resposta not in ["sim", "não", "nao"]:
    print("Resposta inválida. Digite 'SIM' ou 'NÃO'.")
    resposta = input("Você é dev? (SIM/NÃO): ").strip().lower()

voce_e_dev = resposta in ["sim"]

# Exibe o resultado
print(f"\n {'='*4} Dados Coletados{'='*4}")
print(f"Nome: {nome}")
print(f"Idade: {idade}")
print(f"Altura: {altura:.2f} m")
print(f"Você é Desenvolvedor? {'Sim' if voce_e_dev else 'Não'}\n\n{'='*14}")

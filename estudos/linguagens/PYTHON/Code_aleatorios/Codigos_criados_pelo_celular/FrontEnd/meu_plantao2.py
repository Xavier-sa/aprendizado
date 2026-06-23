import json
from datetime import datetime, timedelta

# Configurações de jornada de trabalho
hora_entrada_padrao = datetime.strptime("07:00", "%H:%M")
hora_saida_padrao = datetime.strptime("19:00", "%H:%M")
jornada_trabalho = timedelta(hours=12)

# Função para calcular atrasos e horas extras
def registrar_ponto(nome_funcionario, entrada, saida, data):
    hora_entrada = datetime.strptime(entrada, "%H:%M")
    hora_saida = datetime.strptime(saida, "%H:%M")

    # Calculando atraso
    atraso = timedelta(0)
    if hora_entrada > hora_entrada_padrao:
        atraso = hora_entrada - hora_entrada_padrao

    # Calculando horas extras
    horas_extras = timedelta(0)
    tempo_trabalhado = hora_saida - hora_entrada
    if tempo_trabalhado > jornada_trabalho:
        horas_extras = tempo_trabalhado - jornada_trabalho

    # Montando o registro
    registro = {
        "data": data,
        "entrada": entrada,
        "saida": saida,
        "atraso": str(atraso),
        "horas_extras": str(horas_extras)
    }

    return registro

# Função para gerar o mês completo de registros (trabalha um dia, folga o outro)
def gerar_registro_mensal(nome_funcionario, mes, ano):
    registros = []
    data_inicial = datetime(ano, mes, 1)
    for dia in range(0, 30, 2):  # Um dia trabalha, outro folga
        data_trabalho = data_inicial + timedelta(days=dia)
        data_formatada = data_trabalho.strftime("%Y-%m-%d")
        
        # Exemplo de horários para entrada e saída (pode adaptar conforme necessidade)
        entrada = "07:00" if dia % 4 == 0 else "07:15"  # Varia os atrasos
        saida = "19:00" if dia % 4 == 0 else "19:30"    # Varia as horas extras

        # Registrar o ponto do dia
        registro = registrar_ponto(nome_funcionario, entrada, saida, data_formatada)
        registros.append(registro)

    return registros

# Função para salvar os registros em JSON
def salvar_json(nome_funcionario, registros):
    arquivo = f"{nome_funcionario}_registros.json"
    with open(arquivo, "w") as f:
        json.dump(registros, f, indent=4)
    print(f"Registros salvos em {arquivo}")

# Exemplo de uso
nome = "xavier"
mes = 9  # Mês de setembro
ano = 2024

# Gerar e salvar registros mensais
registros_mensais = gerar_registro_mensal(nome, mes, ano)
salvar_json(nome, registros_mensais)

print("Hello, World!")

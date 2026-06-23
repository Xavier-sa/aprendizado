
from datetime import datetime, timedelta

# Configurações de jornada de trabalho
hora_entrada_padrao = datetime.strptime("07:00", "%H:%M")
hora_saida_padrao = datetime.strptime("19:00", "%H:%M")
jornada_trabalho = timedelta(hours=12)

# Função para calcular atrasos e horas extras
def registrar_ponto(nome_funcionario, entrada, saida):
    # Convertendo as entradas de string para datetime
    hora_entrada = datetime.strptime(entrada, "%H:%M")
    hora_saida = datetime.strptime(saida, "%H:%M")

    # Calculando atrasos
    atraso = timedelta(0)
    if hora_entrada > hora_entrada_padrao:
        atraso = hora_entrada - hora_entrada_padrao
    
    # Calculando horas extras
    horas_extras = timedelta(0)
    tempo_trabalhado = hora_saida - hora_entrada
    if tempo_trabalhado > jornada_trabalho:
        horas_extras = tempo_trabalhado - jornada_trabalho

    # Exibindo os resultados
    print(f"Funcionario: {nome_funcionario}")
    print(f"Hora de Entrada: {entrada}")
    print(f"Hora de Saída: {saida}")
    print(f"Atraso: {atraso}")
    print(f"Horas Extras: {horas_extras}")
    print("-" * 40)

# Exemplo de uso
nome = "João"
entrada = "07:15"  # João chegou 15 minutos atrasado
saida = "19:30"    # João saiu 30 minutos mais tarde, então fez 30 min de horas extras

registrar_ponto(nome, entrada, saida)

nome2 = "Maria"
entrada2 = "06:55"  # Maria chegou antes, sem atraso
saida2 = "18:55"    # Maria saiu antes, sem horas extras

registrar_ponto(nome2, entrada2, saida2)

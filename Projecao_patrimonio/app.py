# app.py
from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        # Receber dados
        renda = float(request.form["renda"])
        gastos = float(request.form["gastos"])
        divida_total = float(request.form["divida_total"])
        parcela_divida = float(request.form["parcela_divida"])
        taxa_juros = float(request.form.get("taxa_juros", 0))
        
        # Validações
        if renda <= 0 or gastos < 0 or divida_total < 0 or parcela_divida < 0:
            return render_template("erro.html", mensagem="Valores devem ser positivos")
        
        if gastos + parcela_divida > renda:
            return render_template("erro.html", 
                mensagem="Seus gastos + parcela excedem sua renda! Situação crítica.")
        
        # Cálculos
        sobra_mensal = renda - gastos - parcela_divida
        
        # Calcular tempo de quitação considerando juros
        if taxa_juros > 0:
            taxa_mensal = taxa_juros / 100
            if parcela_divida > 0:
                # Fórmula de amortização
                tempo_quitacao = calcular_tempo_com_juros(
                    divida_total, parcela_divida, taxa_mensal
                )
            else:
                tempo_quitacao = 0
        else:
            tempo_quitacao = round(divida_total / max(parcela_divida, 1), 1) if parcela_divida > 0 else 0
        
        # Projeção de patrimônio
        meses_projecao = 24
        meses_apos_quitacao = max(meses_projecao - tempo_quitacao, 0)
        poupanca_mensal = parcela_divida + sobra_mensal
        patrimonio_est = round(poupanca_mensal * meses_apos_quitacao, 2)
        
        # Dados para gráficos
        grafico_divida = gerar_grafico_quitacao(divida_total, parcela_divida, taxa_juros, int(tempo_quitacao) + 1)
        grafico_patrimonio = gerar_grafico_patrimonio(sobra_mensal, poupanca_mensal, int(tempo_quitacao), meses_projecao)
        grafico_pizza = gerar_grafico_pizza(renda, gastos, parcela_divida, sobra_mensal)
        
        # Alertas e dicas
        alertas = gerar_alertas(renda, gastos, parcela_divida, sobra_mensal, divida_total)
        
        return render_template("resultado.html",
            renda=renda,
            gastos=gastos,
            divida_total=divida_total,
            parcela_divida=parcela_divida,
            taxa_juros=taxa_juros,
            sobra=round(sobra_mensal, 2),
            tempo=round(tempo_quitacao, 1),
            patrimonio=patrimonio_est,
            grafico_divida=json.dumps(grafico_divida),
            grafico_patrimonio=json.dumps(grafico_patrimonio),
            grafico_pizza=json.dumps(grafico_pizza),
            alertas=alertas
        )
    except ValueError:
        return render_template("erro.html", mensagem="Por favor, insira valores numéricos válidos")
    except Exception as e:
        return render_template("erro.html", mensagem=f"Erro ao processar: {str(e)}")

def calcular_tempo_com_juros(divida, parcela, taxa_mensal):
    """Calcula tempo de quitação considerando juros compostos"""
    if taxa_mensal <= 0 or parcela <= 0:
        return 0
    
    meses = 0
    saldo = divida
    max_meses = 600  # Limite de 50 anos
    
    while saldo > 0 and meses < max_meses:
        juros = saldo * taxa_mensal
        amortizacao = parcela - juros
        
        if amortizacao <= 0:
            return 999  # Parcela insuficiente para pagar juros
        
        saldo -= amortizacao
        meses += 1
    
    return meses

def gerar_grafico_quitacao(divida, parcela, taxa_juros, meses):
    """Gera dados para o gráfico de evolução da dívida"""
    labels = []
    valores = []
    saldo = divida
    taxa_mensal = taxa_juros / 100
    
    for mes in range(min(meses, 60)):  # Limitar a 60 meses para visualização
        labels.append(f"Mês {mes}")
        valores.append(round(saldo, 2))
        
        if saldo <= 0:
            break
        
        juros = saldo * taxa_mensal
        amortizacao = max(parcela - juros, 0)
        saldo -= amortizacao
    
    return {"labels": labels, "valores": valores}

def gerar_grafico_patrimonio(sobra, poupanca_futura, inicio_poupanca, total_meses):
    """Gera dados para projeção de patrimônio"""
    labels = []
    valores = []
    patrimonio = 0
    
    for mes in range(total_meses + 1):
        labels.append(f"Mês {mes}")
        
        if mes < inicio_poupanca:
            patrimonio += sobra
        else:
            patrimonio += poupanca_futura
        
        valores.append(round(patrimonio, 2))
    
    return {"labels": labels, "valores": valores}

def gerar_grafico_pizza(renda, gastos, parcela, sobra):
    """Gera dados para gráfico de distribuição de renda"""
    return {
        "labels": ["Gastos Fixos", "Parcela Dívida", "Sobra/Poupança"],
        "valores": [
            round(gastos, 2),
            round(parcela, 2),
            round(sobra, 2)
        ],
        "cores": ["#e74c3c", "#f39c12", "#2ecc71"]
    }

def gerar_alertas(renda, gastos, parcela, sobra, divida):
    """Gera alertas e dicas personalizadas"""
    alertas = []
    
    # Percentual de comprometimento
    comprometimento = ((gastos + parcela) / renda) * 100
    
    if comprometimento > 70:
        alertas.append({
            "tipo": "perigo",
            "mensagem": f"Alerta! {comprometimento:.1f}% da sua renda está comprometida. Risco financeiro alto!"
        })
    elif comprometimento > 50:
        alertas.append({
            "tipo": "aviso",
            "mensagem": f"Atenção: {comprometimento:.1f}% da renda comprometida. Considere reduzir gastos."
        })
    
    # Capacidade de poupança
    if sobra < renda * 0.1:
        alertas.append({
            "tipo": "aviso",
            "mensagem": "Sua capacidade de poupança é baixa. Tente economizar pelo menos 10% da renda."
        })
    elif sobra >= renda * 0.2:
        alertas.append({
            "tipo": "sucesso",
            "mensagem": f"Ótimo! Você consegue poupar {(sobra/renda)*100:.1f}% da sua renda."
        })
    
    # Dívida em relação à renda
    if divida > renda * 12:
        alertas.append({
            "tipo": "perigo",
            "mensagem": "Sua dívida total é maior que 12 meses de renda. Priorize quitação urgente!"
        })
    
    return alertas

@app.route("/api/simular", methods=["POST"])
def simular_api():
    """Endpoint para simulações dinâmicas via AJAX"""
    data = request.json
    # Aqui você pode adicionar lógica para simulações em tempo real
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)
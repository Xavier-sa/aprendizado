# app.py
from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route("/")
def index():
    try:
        return render_template("index.html")
    except Exception as e:
        return f"Erro ao carregar página: {str(e)}", 500

@app.route("/calcular", methods=["POST"])
def calcular():
    try:
        # Receber dados com valores padrão
        renda = float(request.form.get("renda", 0))
        gastos = float(request.form.get("gastos", 0))
        divida_total = float(request.form.get("divida_total", 0))
        parcela_divida = float(request.form.get("parcela_divida", 0))
        taxa_juros = float(request.form.get("taxa_juros", 0))
        
        # Validações básicas
        if renda <= 0:
            return render_template("erro.html", mensagem="Renda deve ser maior que zero")
        
        if any(valor < 0 for valor in [gastos, divida_total, parcela_divida, taxa_juros]):
            return render_template("erro.html", mensagem="Valores não podem ser negativos")
        
        # Cálculo da sobra mensal
        try:
            sobra_mensal = renda - gastos - parcela_divida
            if sobra_mensal < 0:
                return render_template("erro.html", 
                    mensagem="Seus gastos + parcela excedem sua renda! Situação crítica.")
        except Exception as e:
            return render_template("erro.html", mensagem=f"Erro no cálculo da sobra: {str(e)}")
        
        # Cálculo do tempo de quitação
        try:
            if taxa_juros > 0:
                taxa_mensal = taxa_juros / 100
                tempo_quitacao = calcular_tempo_com_juros(divida_total, parcela_divida, taxa_mensal)
            else:
                tempo_quitacao = divida_total / parcela_divida if parcela_divida > 0 else 0
            
            tempo_quitacao = round(tempo_quitacao, 1)
        except Exception as e:
            print(f"Erro no cálculo do tempo: {e}")
            tempo_quitacao = 0
        
        # Projeção de patrimônio
        try:
            meses_projecao = 24
            meses_apos_quitacao = max(meses_projecao - tempo_quitacao, 0)
            poupanca_mensal = parcela_divida + sobra_mensal
            patrimonio_est = round(poupanca_mensal * meses_apos_quitacao, 2)
        except Exception as e:
            print(f"Erro na projeção: {e}")
            patrimonio_est = 0
        
        # Geração de gráficos
        try:
            grafico_divida = gerar_grafico_quitacao(divida_total, parcela_divida, taxa_juros, int(tempo_quitacao) + 1)
        except Exception as e:
            print(f"Erro no gráfico dívida: {e}")
            grafico_divida = {"labels": [], "valores": []}
        
        try:
            grafico_patrimonio = gerar_grafico_patrimonio(sobra_mensal, poupanca_mensal, int(tempo_quitacao), meses_projecao)
        except Exception as e:
            print(f"Erro no gráfico patrimônio: {e}")
            grafico_patrimonio = {"labels": [], "valores": []}
        
        try:
            grafico_pizza = gerar_grafico_pizza(renda, gastos, parcela_divida, sobra_mensal)
        except Exception as e:
            print(f"Erro no gráfico pizza: {e}")
            grafico_pizza = {"labels": [], "valores": [], "cores": []}
        
        # Geração de alertas
        try:
            alertas = gerar_alertas(renda, gastos, parcela_divida, sobra_mensal, divida_total)
        except Exception as e:
            print(f"Erro nos alertas: {e}")
            alertas = []
        
        return render_template("resultado.html",
            renda=renda,
            gastos=gastos,
            divida_total=divida_total,
            parcela_divida=parcela_divida,
            taxa_juros=taxa_juros,
            sobra=round(sobra_mensal, 2),
            tempo=tempo_quitacao,
            patrimonio=patrimonio_est,
            grafico_divida=json.dumps(grafico_divida),
            grafico_patrimonio=json.dumps(grafico_patrimonio),
            grafico_pizza=json.dumps(grafico_pizza),
            alertas=alertas
        )
        
    except ValueError as ve:
        return render_template("erro.html", mensagem=f"Valor inválido: {str(ve)}")
    except Exception as e:
        return render_template("erro.html", mensagem=f"Erro inesperado: {str(e)}")

def calcular_tempo_com_juros(divida, parcela, taxa_mensal):
    """Calcula tempo de quitação considerando juros compostos"""
    try:
        if taxa_mensal <= 0 or parcela <= 0 or divida <= 0:
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
        
    except Exception as e:
        print(f"Erro no cálculo de juros: {e}")
        return 0

def gerar_grafico_quitacao(divida, parcela, taxa_juros, meses):
    """Gera dados para o gráfico de evolução da dívida"""
    try:
        labels = []
        valores = []
        saldo = divida
        taxa_mensal = taxa_juros / 100
        
        for mes in range(min(meses, 60)):  # Limitar a 60 meses para visualização
            labels.append(f"Mês {mes+1}")
            valores.append(max(round(saldo, 2), 0))
            
            if saldo <= 0:
                break
            
            juros = saldo * taxa_mensal
            amortizacao = max(parcela - juros, 0)
            saldo -= amortizacao
        
        return {"labels": labels, "valores": valores}
        
    except Exception as e:
        print(f"Erro no gráfico de quitação: {e}")
        return {"labels": [], "valores": []}

def gerar_grafico_patrimonio(sobra, poupanca_futura, inicio_poupanca, total_meses):
    """Gera dados para projeção de patrimônio"""
    try:
        labels = []
        valores = []
        patrimonio = 0
        
        for mes in range(total_meses + 1):
            labels.append(f"Mês {mes+1}")
            
            if mes < inicio_poupanca:
                patrimonio += sobra
            else:
                patrimonio += poupanca_futura
            
            valores.append(max(round(patrimonio, 2), 0))
        
        return {"labels": labels, "valores": valores}
        
    except Exception as e:
        print(f"Erro no gráfico de patrimônio: {e}")
        return {"labels": [], "valores": []}

def gerar_grafico_pizza(renda, gastos, parcela, sobra):
    """Gera dados para gráfico de distribuição de renda"""
    try:
        # Garantir que valores não sejam negativos
        gastos = max(gastos, 0)
        parcela = max(parcela, 0)
        sobra = max(sobra, 0)
        
        return {
            "labels": ["Gastos Fixos", "Parcela Dívida", "Sobra/Poupança"],
            "valores": [
                round(gastos, 2),
                round(parcela, 2),
                round(sobra, 2)
            ],
            "cores": ["#e74c3c", "#f39c12", "#2ecc71"]
        }
        
    except Exception as e:
        print(f"Erro no gráfico pizza: {e}")
        return {"labels": [], "valores": [], "cores": []}

def gerar_alertas(renda, gastos, parcela, sobra, divida):
    """Gera alertas e dicas personalizadas"""
    try:
        alertas = []
        
        if renda <= 0:
            return alertas
        
        # Percentual de comprometimento
        try:
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
        except Exception as e:
            print(f"Erro no cálculo de comprometimento: {e}")
        
        # Capacidade de poupança
        try:
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
        except Exception as e:
            print(f"Erro no cálculo de poupança: {e}")
        
        # Dívida em relação à renda
        try:
            if divida > renda * 12:
                alertas.append({
                    "tipo": "perigo",
                    "mensagem": "Sua dívida total é maior que 12 meses de renda. Priorize quitação urgente!"
                })
        except Exception as e:
            print(f"Erro no cálculo dívida/renda: {e}")
        
        return alertas
        
    except Exception as e:
        print(f"Erro na geração de alertas: {e}")
        return []

@app.route("/api/simular", methods=["POST"])
def simular_api():
    """Endpoint para simulações dinâmicas via AJAX"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "Dados não fornecidos"}), 400
        
        # Aqui você pode adicionar lógica para simulações em tempo real
        return jsonify({"status": "success", "data": data})
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.errorhandler(404)
def pagina_nao_encontrada(e):
    return render_template("erro.html", mensagem="Página não encontrada"), 404

@app.errorhandler(500)
def erro_servidor(e):
    return render_template("erro.html", mensagem="Erro interno do servidor"), 500

if __name__ == "__main__":
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"Erro ao iniciar servidor: {e}")
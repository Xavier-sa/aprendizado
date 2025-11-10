from flask import Flask, request, jsonify, render_template
from datetime import datetime, timedelta

app = Flask(__name__)

def verificar_folga(data_verificacao, data_inicio):
    """
    Verifica se o funcionário está de folga na data especificada, com base na escala 12x36.
    """
    diferenca = data_verificacao - data_inicio
    segundos_diferenca = diferenca.total_seconds()
    
    periodo_total = timedelta(hours=48)
    folga_inicio = timedelta(hours=12)
    
    return (segundos_diferenca % periodo_total.total_seconds()) >= folga_inicio.total_seconds()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/verificar', methods=['POST'])
def verificar():
    try:
        dia_inicio = int(request.form['dia_inicio'])
        mes_inicio = int(request.form['mes_inicio'])
        ano_inicio = int(request.form['ano_inicio'])
        hora_inicio = request.form['hora_inicio']
        dia_verificacao = int(request.form['dia_verificacao'])
        mes_verificacao = int(request.form['mes_verificacao'])
        ano_verificacao = int(request.form['ano_verificacao'])
        hora_verificacao = request.form['hora_verificacao']
        
        # Verifique o formato das horas
        if len(hora_inicio.split(':')) != 3 or len(hora_verificacao.split(':')) != 3:
            raise ValueError("O formato da hora deve ser HH:MM:SS")
        
        hora_inicio_parts = [int(part) for part in hora_inicio.split(':')]
        hora_verificacao_parts = [int(part) for part in hora_verificacao.split(':')]
        
        inicio = datetime(ano_inicio, mes_inicio, dia_inicio, hora_inicio_parts[0], hora_inicio_parts[1], hora_inicio_parts[2])
        verificacao = datetime(ano_verificacao, mes_verificacao, dia_verificacao, hora_verificacao_parts[0], hora_verificacao_parts[1], hora_verificacao_parts[2])
        
        if verificar_folga(verificacao, inicio):
            resultado = "O funcionário está de folga nesta data e hora."
        else:
            resultado = "O funcionário não está de folga nesta data e hora."
        
        return jsonify({"resultado": resultado})
    
    except Exception as e:
        return jsonify({"resultado": f"Erro: {str(e)}"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

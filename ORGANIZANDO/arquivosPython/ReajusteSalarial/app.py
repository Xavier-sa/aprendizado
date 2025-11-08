from flask import Flask, render_template, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) # Permite todas as origens (para desenvolvimento)

@app.route('/')
def index():
    # 'render_template' agora está definido e busca seu HTML na pasta 'template'
    return render_template('calculadora.html') 

@app.route('/calcular', methods=['POST'])
def calcular_aumento():
    try:
        # 'request' agora está definido
        dados = request.get_json()
        salario = float(dados.get('salario', 0))
        percentual = float(dados.get('percentual', 7.5))
        
        # Calcular aumento
        valor_aumento = salario * (percentual / 100)
        novo_salario = salario + valor_aumento
        
        # Calcular diferença anual
        diferenca_mensal = valor_aumento
        diferenca_anual = valor_aumento * 12
        
        resultado = {
            'sucesso': True,
            'salario_atual': salario,
            'percentual': percentual,
            'valor_aumento': valor_aumento,
            'novo_salario': novo_salario,
            'diferenca_mensal': diferenca_mensal,
            'diferenca_anual': diferenca_anual
        }
        
        # 'jsonify' agora está definido
        return jsonify(resultado)
    
    except Exception as e:
        return jsonify({
            'sucesso': False,
            'erro': str(e)
        }), 400

@app.route('/comparar', methods=['POST'])
def comparar_aumentos():
    try:
        dados = request.get_json()
        salario = float(dados.get('salario', 0))
        percentuais = [5, 7.5, 10, 12, 15] 
        
        comparacoes = []
        for perc in percentuais:
            valor_aumento = salario * (perc / 100)
            novo_salario = salario + valor_aumento
            
            comparacoes.append({
                'percentual': perc,
                'valor_aumento': valor_aumento,
                'novo_salario': novo_salario,
                'ganho_anual': valor_aumento * 12
            })
        
        return jsonify({
            'sucesso': True,
            'salario_base': salario,
            'comparacoes': comparacoes
        })
    
    except Exception as e:
        return jsonify({
            'sucesso': False,
            'erro': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
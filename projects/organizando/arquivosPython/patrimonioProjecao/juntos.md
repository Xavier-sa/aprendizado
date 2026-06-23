app:from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    renda = float(request.form["renda"])
    gastos = float(request.form["gastos"])
    divida_total = float(request.form["divida_total"])
    parcela_divida = float(request.form["parcela_divida"])

    sobra_mensal = renda - gastos - parcela_divida

    # Evita divisão por zero
    tempo_quitacao = round(divida_total / max(parcela_divida + sobra_mensal, 1), 1)

    # Projeção de patrimônio após quitar dívida (2 anos)
    meses_apos_quitacao = max(24 - tempo_quitacao, 0)
    poupanca_mensal = parcela_divida + sobra_mensal
    patrimonio_est = round(poupanca_mensal * meses_apos_quitacao, 2)

    return render_template("resultado.html",
                           sobra=sobra_mensal,
                           tempo=tempo_quitacao,
                           patrimonio=patrimonio_est)

if __name__ == "__main__":
    app.run(debug=True)
resultado:<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado</title>
</head>
<body>
    <h1>Resultado da Projeção</h1>
    <p><strong>Sobra mensal:</strong> R$ {{ sobra }}</p>
    <p><strong>Tempo estimado para quitar dívidas:</strong> {{ tempo }} meses</p>
    <p><strong>Projeção de patrimônio em 2 anos:</strong> R$ {{ patrimonio }}</p>

    <a href="/">Voltar</a>
</body>
</html>
index:<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Projeção Financeira</title>
</head>
<body>
    <h1>Projeção Financeira</h1>
    <form action="/calcular" method="post">
        <label>Renda Mensal: R$</label>
        <input type="number" name="renda" step="0.01" required><br><br>

        <label>Gastos Mensais (fixos + variáveis): R$</label>
        <input type="number" name="gastos" step="0.01" required><br><br>

        <label>Total da Dívida Atual: R$</label>
        <input type="number" name="divida_total" step="0.01" required><br><br>

        <label>Parcela Mensal da Dívida: R$</label>
        <input type="number" name="parcela_divida" step="0.01" required><br><br>

        <input type="submit" value="Calcular">
    </form>
</body>
</html>

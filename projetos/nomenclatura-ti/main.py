from flask import Flask, jsonify, request, abort
import json

# Carregar termos do arquivo JSON
with open("termos.json", "r", encoding="utf-8") as f:
    termos = json.load(f)

app = Flask(__name__)


@app.route("/")
def raiz():
    return jsonify({
        "mensagem": "Bem-vindo à API do glossário de TI!",
        "endpoints": {
            "/termos": "Lista todos os termos",
            "/buscar/<palavra>": "Busca definição de uma palavra",
            "/procurar?texto=": "Busca por trecho"
        }
    })


@app.route("/termos")
def listar_termos():
    """Retorna todos os termos."""
    return jsonify(termos)


@app.route("/buscar/<palavra>")
def buscar_palavra(palavra):
    """Busca palavra exata."""
    palavra = palavra.lower()

    if palavra not in termos:
        abort(404, description="Palavra não encontrada no glossário.")

    return jsonify({palavra: termos[palavra]})


@app.route("/procurar")
def procurar_por_trecho():
    texto = request.args.get("texto", "").lower()

    resultados = {
        termo: definicao
        for termo, definicao in termos.items()
        if texto in termo.lower() or texto in definicao.lower()
    }

    if not resultados:
        abort(404, description="Nenhum termo encontrado com esse trecho.")

    return jsonify(resultados)


if __name__ == "__main__":
    app.run(debug=True)

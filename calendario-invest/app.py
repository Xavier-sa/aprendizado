from flask import Flask, jsonify, render_template, request
from datetime import date
import json
import math
import os
from pathlib import Path
from tempfile import NamedTemporaryFile

app = Flask(__name__)
DATA_FILE = Path(__file__).with_name("depositos.json")
META_PADRAO = 23450
METODOS_VALIDOS = {"Pix", "Depósito bancário", "TED/Transferência"}


def carregar_dados():
    if not DATA_FILE.exists():
        return {"meta": META_PADRAO, "depositos": {}}
    try:
        dados = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        if "depositos" in dados:
            return {"meta": float(dados.get("meta", META_PADRAO)), "depositos": dados["depositos"]}
        # Migra automaticamente o formato antigo, que continha apenas os depósitos.
        return {"meta": META_PADRAO, "depositos": dados}
    except (json.JSONDecodeError, OSError):
        return {"meta": META_PADRAO, "depositos": {}}


def salvar_dados(dados):
    conteudo = json.dumps(dados, ensure_ascii=False, indent=2)
    with NamedTemporaryFile("w", encoding="utf-8", dir=DATA_FILE.parent, delete=False) as arquivo:
        arquivo.write(conteudo)
        temporario = Path(arquivo.name)
    os.replace(temporario, DATA_FILE)


def calcular_quantidade(meta):
    """Menor n em que 1 + 2 + ... + n alcança ou ultrapassa a meta."""
    return math.ceil((math.sqrt(1 + 8 * meta) - 1) / 2)


def criar_resumo(dados):
    meta = dados["meta"]
    quantidade = calcular_quantidade(meta)
    depositos_visiveis = {
        chave: item for chave, item in dados["depositos"].items()
        if chave.isdigit() and int(chave) <= quantidade
    }
    total = round(sum(float(item.get("valor", 0)) for item in depositos_visiveis.values()), 2)
    return {
        "total": total,
        "meta": meta,
        "restante": round(max(0, meta - total), 2),
        "concluido": len(depositos_visiveis),
        "quantidade": quantidade,
        "soma_sugerida": quantidade * (quantidade + 1) / 2,
        "depositos": depositos_visiveis,
    }


@app.route("/")
def index():
    resumo = criar_resumo(carregar_dados())
    return render_template("index.html", **resumo)


@app.route("/api/depositos", methods=["GET"])
def listar_depositos():
    dados = carregar_dados()
    return jsonify(criar_resumo(dados))


@app.route("/api/meta", methods=["POST"])
def atualizar_meta():
    corpo = request.get_json(silent=True) or {}
    try:
        meta = round(float(corpo.get("meta")), 2)
    except (TypeError, ValueError):
        return jsonify({"erro": "Informe uma meta válida."}), 400
    if meta <= 0:
        return jsonify({"erro": "A meta deve ser maior que zero."}), 400

    dados = carregar_dados()
    dados["meta"] = meta
    salvar_dados(dados)
    return jsonify({"ok": True, **criar_resumo(dados)})


@app.route("/api/depositos/<int:numero>", methods=["POST"])
def registrar_deposito(numero):
    dados = carregar_dados()
    quantidade = calcular_quantidade(dados["meta"])
    if numero < 1 or numero > quantidade:
        return jsonify({"erro": f"Número fora do intervalo de 1 a {quantidade}."}), 400

    corpo = request.get_json(silent=True) or {}
    banco = str(corpo.get("banco", "")).strip()
    metodo = str(corpo.get("metodo", "")).strip()
    detalhes = str(corpo.get("detalhes", "")).strip()
    valor = corpo.get("valor", numero)

    if not banco:
        return jsonify({"erro": "Informe o banco de destino."}), 400
    if metodo not in METODOS_VALIDOS:
        return jsonify({"erro": "Selecione um método de depósito válido."}), 400

    try:
        valor = float(valor)
    except (TypeError, ValueError):
        return jsonify({"erro": "Informe um valor válido."}), 400

    if valor <= 0:
        return jsonify({"erro": "O valor do depósito deve ser maior que zero."}), 400

    data_deposito = str(corpo.get("data", "")).strip()
    try:
        data_deposito = date.fromisoformat(data_deposito or str(date.today())).isoformat()
    except ValueError:
        return jsonify({"erro": "Informe uma data válida."}), 400

    dados["depositos"][str(numero)] = {
        "numero": numero,
        "valor": round(valor, 2),
        "banco": banco,
        "metodo": metodo,
        "detalhes": detalhes,
        "data": data_deposito,
    }
    salvar_dados(dados)
    return jsonify({"ok": True, **criar_resumo(dados)})


@app.route("/api/depositos/<int:numero>", methods=["DELETE"])
def remover_deposito(numero):
    dados = carregar_dados()
    dados["depositos"].pop(str(numero), None)
    salvar_dados(dados)
    return jsonify({"ok": True, **criar_resumo(dados)})


if __name__ == "__main__":
    app.run(debug=True)

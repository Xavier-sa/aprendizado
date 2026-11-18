"""Servidor web para o sistema de controle diário de acesso."""

import json
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, render_template, request


app = Flask(__name__)

# O caminho é baseado na localização deste arquivo. Assim, o JSON é salvo no
# lugar correto mesmo quando o comando é executado a partir de outra pasta.
ARQUIVO_DADOS = Path(__file__).with_name("acessos.json")


def carregar_dados():
    """Lê os acessos já cadastrados ou retorna uma lista vazia."""
    if not ARQUIVO_DADOS.exists():
        return []

    try:
        with ARQUIVO_DADOS.open("r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
            return dados if isinstance(dados, list) else []
    except (json.JSONDecodeError, OSError):
        return []


def salvar_dados(dados):
    """Grava a lista de acessos no arquivo JSON."""
    with ARQUIVO_DADOS.open("w", encoding="utf-8") as arquivo:
        json.dump(dados, arquivo, indent=4, ensure_ascii=False)


@app.route("/")
def pagina_inicial():
    """Exibe o formulário principal."""
    return render_template("index.html")


@app.route("/api/cadastrar", methods=["POST"])
def cadastrar_acesso():
    """Valida e registra um novo acesso recebido em formato JSON."""
    novo_registro = request.get_json(silent=True)

    if not isinstance(novo_registro, dict):
        return jsonify({"erro": "Nenhum dado válido foi enviado."}), 400

    nome = str(novo_registro.get("nome", "")).strip()
    documento = str(novo_registro.get("documento", "")).strip()
    tipo_acesso = str(novo_registro.get("tipo_acesso", "")).strip()
    placa = str(novo_registro.get("placa") or "").strip().upper()

    if not nome or not documento:
        return jsonify({"erro": "Nome e documento são obrigatórios."}), 400

    if tipo_acesso not in {"A pé", "Veículo"}:
        return jsonify({"erro": "Selecione um tipo de acesso válido."}), 400

    if tipo_acesso == "Veículo" and not placa:
        return jsonify({"erro": "Informe a placa do veículo."}), 400

    registro_validado = {
        "nome": nome,
        "documento": documento,
        "tipo_acesso": tipo_acesso,
        "placa": placa if tipo_acesso == "Veículo" else None,
        "data_hora": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
    }

    lista_atual = carregar_dados()
    lista_atual.append(registro_validado)

    try:
        salvar_dados(lista_atual)
    except OSError:
        return jsonify({"erro": "Não foi possível salvar o registro."}), 500

    return (
        jsonify(
            {
                "mensagem": "Acesso registrado com sucesso!",
                "dados": registro_validado,
            }
        ),
        201,
    )


if __name__ == "__main__":
    app.run(debug=True)

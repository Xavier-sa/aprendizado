from datetime import date, timedelta
from functools import wraps
import json
import math
import os
from pathlib import Path
from tempfile import NamedTemporaryFile
from uuid import uuid4

from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from psycopg import connect
from psycopg.types.json import Jsonb
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config.update(
    SECRET_KEY=os.environ.get("SECRET_KEY", "desenvolvimento-troque-esta-chave"),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=bool(os.environ.get("VERCEL")),
    PERMANENT_SESSION_LIFETIME=timedelta(days=30),
)
ARQUIVO_INICIAL = Path(__file__).with_name("depositos.json")


def caminho_dados(ambiente=None):
    """Escolhe um caminho gravável sem quebrar a execução local."""
    ambiente = ambiente or os.environ
    if ambiente.get("CALENDARIO_DATA_FILE"):
        return Path(ambiente["CALENDARIO_DATA_FILE"])
    if ambiente.get("VERCEL"):
        return Path("/tmp/calendario-invest-depositos.json")
    return ARQUIVO_INICIAL


DATA_FILE = caminho_dados()
DATABASE_URL = os.environ.get("DATABASE_URL")
META_PADRAO = 23450
METODOS_VALIDOS = {"Pix", "Depósito bancário", "TED/Transferência"}


def novo_id(prefixo):
    return f"{prefixo}_{uuid4().hex[:12]}"


def dados_iniciais():
    meta_id = novo_id("meta")
    return {"versao": 2, "meta_ativa_id": meta_id, "metas": [
        {"id": meta_id, "nome": "Meta 1", "valor": META_PADRAO, "depositos": {}}
    ], "bancos": []}


def migrar_dados(dados):
    if isinstance(dados, dict) and dados.get("versao") == 2:
        dados.setdefault("bancos", [])
        dados.setdefault("metas", [])
        if dados["metas"] and not dados.get("meta_ativa_id"):
            dados["meta_ativa_id"] = dados["metas"][0]["id"]
        return dados
    if not isinstance(dados, dict):
        return dados_iniciais()
    meta_id = novo_id("meta")
    depositos_antigos = dados.get("depositos", dados)
    bancos_por_nome, bancos, depositos = {}, [], {}
    if isinstance(depositos_antigos, dict):
        for numero, item in depositos_antigos.items():
            if not isinstance(item, dict):
                continue
            banco_nome = str(item.get("banco", "")).strip()
            banco_id = None
            if banco_nome:
                chave = banco_nome.casefold()
                if chave not in bancos_por_nome:
                    banco_id = novo_id("banco")
                    bancos_por_nome[chave] = banco_id
                    bancos.append({"id": banco_id, "nome": banco_nome})
                banco_id = bancos_por_nome[chave]
            novo_item = dict(item)
            novo_item["banco_id"] = banco_id
            novo_item.pop("banco", None)
            depositos[str(numero)] = novo_item
    return {"versao": 2, "meta_ativa_id": meta_id, "metas": [{
        "id": meta_id, "nome": "Meta 1",
        "valor": float(dados.get("meta", META_PADRAO)), "depositos": depositos,
    }], "bancos": bancos}


def preparar_banco(conexao):
    conexao.execute("""
        CREATE TABLE IF NOT EXISTS calendario_estado (
            id SMALLINT PRIMARY KEY CHECK (id = 1),
            dados JSONB NOT NULL,
            atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    """)
    conexao.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id UUID PRIMARY KEY,
            nome VARCHAR(80) NOT NULL,
            email VARCHAR(254) NOT NULL UNIQUE,
            senha_hash TEXT NOT NULL,
            criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    """)
    conexao.execute("ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS papel VARCHAR(20) NOT NULL DEFAULT 'usuario'")
    conexao.execute("ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS ativo BOOLEAN NOT NULL DEFAULT TRUE")
    conexao.execute("""
        CREATE TABLE IF NOT EXISTS calendario_estado_usuario (
            usuario_id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
            dados JSONB NOT NULL,
            atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    """)


def dados_semente():
    if ARQUIVO_INICIAL.exists():
        try:
            return migrar_dados(json.loads(ARQUIVO_INICIAL.read_text(encoding="utf-8")))
        except (json.JSONDecodeError, OSError):
            pass
    return dados_iniciais()


def carregar_dados_postgres():
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        raise PermissionError("Autenticação necessária.")
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        linha = conexao.execute(
            "SELECT dados FROM calendario_estado_usuario WHERE usuario_id = %s",
            (usuario_id,),
        ).fetchone()
        if linha:
            return migrar_dados(linha[0])
        dados = dados_iniciais()
        conexao.execute(
            "INSERT INTO calendario_estado_usuario (usuario_id, dados) VALUES (%s, %s)",
            (usuario_id, Jsonb(dados)),
        )
        return dados


def salvar_dados_postgres(dados):
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        raise PermissionError("Autenticação necessária.")
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        conexao.execute("""
            INSERT INTO calendario_estado_usuario (usuario_id, dados, atualizado_em)
            VALUES (%s, %s, NOW())
            ON CONFLICT (usuario_id) DO UPDATE
            SET dados = EXCLUDED.dados, atualizado_em = NOW()
        """, (usuario_id, Jsonb(dados)))


def carregar_dados():
    if DATABASE_URL:
        return carregar_dados_postgres()
    if not DATA_FILE.exists():
        if DATA_FILE != ARQUIVO_INICIAL and ARQUIVO_INICIAL.exists():
            try:
                dados = migrar_dados(json.loads(ARQUIVO_INICIAL.read_text(encoding="utf-8")))
                salvar_dados(dados)
                return dados
            except (json.JSONDecodeError, OSError):
                pass
        return dados_iniciais()
    try:
        return migrar_dados(json.loads(DATA_FILE.read_text(encoding="utf-8")))
    except (json.JSONDecodeError, OSError):
        return dados_iniciais()


def salvar_dados(dados):
    if DATABASE_URL:
        salvar_dados_postgres(dados)
        return
    conteudo = json.dumps(dados, ensure_ascii=False, indent=2)
    with NamedTemporaryFile("w", encoding="utf-8", dir=DATA_FILE.parent, delete=False) as arquivo:
        arquivo.write(conteudo)
        temporario = Path(arquivo.name)
    os.replace(temporario, DATA_FILE)


def calcular_quantidade(meta):
    """Retorna o menor n em que 1 + 2 + ... + n alcança a meta."""
    return math.ceil((math.sqrt(1 + 8 * meta) - 1) / 2)


def buscar_meta(dados, meta_id):
    return next((meta for meta in dados["metas"] if meta["id"] == meta_id), None)


def criar_resumo(meta, bancos):
    valor_meta = float(meta["valor"])
    quantidade = calcular_quantidade(valor_meta)
    bancos_por_id = {banco["id"]: banco["nome"] for banco in bancos}
    depositos_visiveis = {}
    for chave, item in meta.get("depositos", {}).items():
        if chave.isdigit() and int(chave) <= quantidade:
            deposito = dict(item)
            deposito["banco"] = bancos_por_id.get(deposito.get("banco_id"), "Banco removido")
            depositos_visiveis[chave] = deposito
    total = round(sum(float(item.get("valor", 0)) for item in depositos_visiveis.values()), 2)
    return {"id": meta["id"], "nome": meta["nome"], "total": total,
            "meta": valor_meta, "restante": round(max(0, valor_meta - total), 2),
            "concluido": len(depositos_visiveis), "quantidade": quantidade,
            "soma_sugerida": quantidade * (quantidade + 1) / 2,
            "depositos": depositos_visiveis}


def resposta_completa(dados, meta_id=None):
    meta = buscar_meta(dados, meta_id or dados.get("meta_ativa_id"))
    meta = meta or (dados["metas"][0] if dados["metas"] else None)
    return {"meta_ativa": criar_resumo(meta, dados["bancos"]) if meta else None,
            "metas": [criar_resumo(item, dados["bancos"]) for item in dados["metas"]],
            "bancos": dados["bancos"]}


def ler_valor_meta(corpo):
    try:
        valor = round(float(corpo.get("valor", corpo.get("meta"))), 2)
    except (TypeError, ValueError):
        return None
    return valor if valor > 0 else None


def login_obrigatorio(funcao):
    @wraps(funcao)
    def protegida(*args, **kwargs):
        if not session.get("usuario_id"):
            return redirect(url_for("entrar"))
        return funcao(*args, **kwargs)
    return protegida


@app.before_request
def proteger_api():
    if request.path.startswith("/api/") and not session.get("usuario_id"):
        return jsonify({"erro": "Faça login para continuar."}), 401


def buscar_usuario_por_email(email):
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        return conexao.execute(
            "SELECT id, nome, email, senha_hash, ativo, papel FROM usuarios WHERE email = %s",
            (email,),
        ).fetchone()


def buscar_usuario_por_id(usuario_id):
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        return conexao.execute(
            "SELECT id, nome, email, papel, ativo FROM usuarios WHERE id = %s",
            (usuario_id,),
        ).fetchone()


def cadastrar_usuario(nome, email, senha):
    usuario_id = str(uuid4())
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        primeiro_usuario = conexao.execute("SELECT NOT EXISTS (SELECT 1 FROM usuarios)").fetchone()[0]
        if conexao.execute("SELECT 1 FROM usuarios WHERE email = %s", (email,)).fetchone():
            return None
        dados = dados_iniciais()
        if primeiro_usuario:
            legado = conexao.execute(
                "SELECT dados FROM calendario_estado WHERE id = 1"
            ).fetchone()
            if legado:
                dados = migrar_dados(legado[0])
        conexao.execute(
            "INSERT INTO usuarios (id, nome, email, senha_hash) VALUES (%s, %s, %s, %s)",
            (usuario_id, nome, email, generate_password_hash(senha)),
        )
        conexao.execute(
            "INSERT INTO calendario_estado_usuario (usuario_id, dados) VALUES (%s, %s)",
            (usuario_id, Jsonb(dados)),
        )
    return usuario_id


def admin_obrigatorio(funcao):
    @wraps(funcao)
    def protegida(*args, **kwargs):
        usuario = buscar_usuario_por_id(session.get("usuario_id")) if session.get("usuario_id") else None
        if not usuario or usuario[3] != "admin" or not usuario[4]:
            return redirect(url_for("index"))
        return funcao(*args, **kwargs)
    return protegida


@app.route("/entrar", methods=["GET", "POST"])
def entrar():
    if session.get("usuario_id"):
        return redirect(url_for("index"))
    erro = None
    if request.method == "POST":
        email = str(request.form.get("email", "")).strip().casefold()
        senha = str(request.form.get("senha", ""))
        if not DATABASE_URL:
            erro = "O banco de dados não está configurado."
        else:
            usuario = buscar_usuario_por_email(email)
            if not usuario or not usuario[4] or not check_password_hash(usuario[3], senha):
                erro = "E-mail ou senha incorretos."
            else:
                session.clear()
                session["usuario_id"] = str(usuario[0])
                session.permanent = True
                return redirect(url_for("index"))
    return render_template("auth.html", modo="entrar", erro=erro)


@app.route("/cadastro", methods=["GET", "POST"])
def cadastro():
    if session.get("usuario_id"):
        return redirect(url_for("index"))
    erro = None
    if request.method == "POST":
        nome = str(request.form.get("nome", "")).strip()
        email = str(request.form.get("email", "")).strip().casefold()
        senha = str(request.form.get("senha", ""))
        if not nome or len(nome) > 80:
            erro = "Informe um nome com até 80 caracteres."
        elif "@" not in email or len(email) > 254:
            erro = "Informe um e-mail válido."
        elif len(senha) < 8:
            erro = "A senha deve ter pelo menos 8 caracteres."
        elif not DATABASE_URL:
            erro = "O banco de dados não está configurado."
        else:
            usuario_id = cadastrar_usuario(nome, email, senha)
            if not usuario_id:
                erro = "Já existe uma conta com este e-mail."
            else:
                session.clear()
                session["usuario_id"] = usuario_id
                session.permanent = True
                return redirect(url_for("index"))
    return render_template("auth.html", modo="cadastro", erro=erro)


@app.post("/sair")
def sair():
    session.clear()
    return redirect(url_for("entrar"))


@app.get("/admin/usuarios")
@login_obrigatorio
@admin_obrigatorio
def administrar_usuarios():
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        usuarios = conexao.execute("""
            SELECT id, nome, email, papel, ativo, criado_em
            FROM usuarios ORDER BY criado_em
        """).fetchall()
    return render_template("admin_usuarios.html", usuarios=usuarios,
                           usuario_id=session["usuario_id"], erro=request.args.get("erro"))


@app.post("/admin/usuarios/<usuario_id>/editar")
@login_obrigatorio
@admin_obrigatorio
def editar_usuario(usuario_id):
    nome = str(request.form.get("nome", "")).strip()
    email = str(request.form.get("email", "")).strip().casefold()
    papel = str(request.form.get("papel", "usuario"))
    if not nome or len(nome) > 80 or "@" not in email or papel not in {"usuario", "admin"}:
        return redirect(url_for("administrar_usuarios", erro="Dados inválidos."))
    if usuario_id == session["usuario_id"]:
        papel = "admin"
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        duplicado = conexao.execute(
            "SELECT 1 FROM usuarios WHERE email = %s AND id <> %s", (email, usuario_id)
        ).fetchone()
        if duplicado:
            return redirect(url_for("administrar_usuarios", erro="E-mail já cadastrado."))
        conexao.execute(
            "UPDATE usuarios SET nome = %s, email = %s, papel = %s WHERE id = %s",
            (nome, email, papel, usuario_id),
        )
    return redirect(url_for("administrar_usuarios"))


@app.post("/admin/usuarios/<usuario_id>/alternar")
@login_obrigatorio
@admin_obrigatorio
def alternar_usuario(usuario_id):
    if usuario_id == session["usuario_id"]:
        return redirect(url_for("administrar_usuarios", erro="Você não pode desativar sua própria conta."))
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        conexao.execute("UPDATE usuarios SET ativo = NOT ativo WHERE id = %s", (usuario_id,))
    return redirect(url_for("administrar_usuarios"))


@app.post("/admin/usuarios/<usuario_id>/excluir")
@login_obrigatorio
@admin_obrigatorio
def excluir_usuario(usuario_id):
    if usuario_id == session["usuario_id"]:
        return redirect(url_for("administrar_usuarios", erro="Você não pode excluir sua própria conta."))
    with connect(DATABASE_URL, connect_timeout=10) as conexao:
        preparar_banco(conexao)
        conexao.execute("DELETE FROM usuarios WHERE id = %s", (usuario_id,))
    return redirect(url_for("administrar_usuarios"))


@app.route("/")
@login_obrigatorio
def index():
    usuario = buscar_usuario_por_id(session["usuario_id"]) if DATABASE_URL else None
    return render_template("index.html", usuario=usuario)


@app.route("/api/dados", methods=["GET"])
@app.route("/api/depositos", methods=["GET"])
def listar_dados():
    dados = carregar_dados()
    resposta = resposta_completa(dados)
    return jsonify(resposta["meta_ativa"] if request.path == "/api/depositos" else resposta)


@app.route("/api/metas", methods=["POST"])
def criar_meta():
    corpo = request.get_json(silent=True) or {}
    nome, valor = str(corpo.get("nome", "")).strip(), ler_valor_meta(corpo)
    if not nome:
        return jsonify({"erro": "Informe o nome da meta."}), 400
    if valor is None:
        return jsonify({"erro": "Informe um valor de meta maior que zero."}), 400
    dados = carregar_dados()
    meta = {"id": novo_id("meta"), "nome": nome, "valor": valor, "depositos": {}}
    dados["metas"].append(meta)
    dados["meta_ativa_id"] = meta["id"]
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados)}), 201


@app.route("/api/metas/<meta_id>", methods=["PUT"])
def atualizar_meta(meta_id):
    dados, corpo = carregar_dados(), request.get_json(silent=True) or {}
    meta = buscar_meta(dados, meta_id)
    if not meta:
        return jsonify({"erro": "Meta não encontrada."}), 404
    nome, valor = str(corpo.get("nome", "")).strip(), ler_valor_meta(corpo)
    if not nome:
        return jsonify({"erro": "Informe o nome da meta."}), 400
    if valor is None:
        return jsonify({"erro": "Informe um valor de meta maior que zero."}), 400
    meta.update(nome=nome, valor=valor)
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados, meta_id)})


@app.route("/api/metas/<meta_id>/selecionar", methods=["POST"])
def selecionar_meta(meta_id):
    dados = carregar_dados()
    if not buscar_meta(dados, meta_id):
        return jsonify({"erro": "Meta não encontrada."}), 404
    dados["meta_ativa_id"] = meta_id
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados)})


@app.route("/api/metas/<meta_id>", methods=["DELETE"])
def remover_meta(meta_id):
    dados = carregar_dados()
    if len(dados["metas"]) <= 1:
        return jsonify({"erro": "Mantenha pelo menos uma meta cadastrada."}), 400
    meta = buscar_meta(dados, meta_id)
    if not meta:
        return jsonify({"erro": "Meta não encontrada."}), 404
    dados["metas"].remove(meta)
    if dados.get("meta_ativa_id") == meta_id:
        dados["meta_ativa_id"] = dados["metas"][0]["id"]
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados)})


@app.route("/api/bancos", methods=["POST"])
def criar_banco():
    corpo = request.get_json(silent=True) or {}
    nome = str(corpo.get("nome", "")).strip()
    if not nome:
        return jsonify({"erro": "Informe o nome do banco."}), 400
    dados = carregar_dados()
    if any(banco["nome"].casefold() == nome.casefold() for banco in dados["bancos"]):
        return jsonify({"erro": "Este banco já está cadastrado."}), 409
    dados["bancos"].append({"id": novo_id("banco"), "nome": nome})
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados)}), 201


@app.route("/api/bancos/<banco_id>", methods=["PUT"])
def atualizar_banco(banco_id):
    dados, corpo = carregar_dados(), request.get_json(silent=True) or {}
    banco = next((item for item in dados["bancos"] if item["id"] == banco_id), None)
    if not banco:
        return jsonify({"erro": "Banco não encontrado."}), 404
    nome = str(corpo.get("nome", "")).strip()
    if not nome:
        return jsonify({"erro": "Informe o nome do banco."}), 400
    if any(item["id"] != banco_id and item["nome"].casefold() == nome.casefold()
           for item in dados["bancos"]):
        return jsonify({"erro": "Este banco já está cadastrado."}), 409
    banco["nome"] = nome
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados)})


@app.route("/api/bancos/<banco_id>", methods=["DELETE"])
def remover_banco(banco_id):
    dados = carregar_dados()
    banco = next((item for item in dados["bancos"] if item["id"] == banco_id), None)
    if not banco:
        return jsonify({"erro": "Banco não encontrado."}), 404
    em_uso = any(deposito.get("banco_id") == banco_id for meta in dados["metas"]
                 for deposito in meta.get("depositos", {}).values())
    if em_uso:
        return jsonify({"erro": "Este banco está vinculado a um depósito."}), 409
    dados["bancos"].remove(banco)
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados)})


@app.route("/api/metas/<meta_id>/depositos/<int:numero>", methods=["POST"])
def registrar_deposito(meta_id, numero):
    dados, corpo = carregar_dados(), request.get_json(silent=True) or {}
    meta = buscar_meta(dados, meta_id)
    if not meta:
        return jsonify({"erro": "Meta não encontrada."}), 404
    quantidade = calcular_quantidade(float(meta["valor"]))
    if numero < 1 or numero > quantidade:
        return jsonify({"erro": f"Número fora do intervalo de 1 a {quantidade}."}), 400
    banco_id, metodo = str(corpo.get("banco_id", "")).strip(), str(corpo.get("metodo", "")).strip()
    if not any(banco["id"] == banco_id for banco in dados["bancos"]):
        return jsonify({"erro": "Selecione um banco cadastrado."}), 400
    if metodo not in METODOS_VALIDOS:
        return jsonify({"erro": "Selecione um método de depósito válido."}), 400
    try:
        valor = round(float(corpo.get("valor", numero)), 2)
    except (TypeError, ValueError):
        return jsonify({"erro": "Informe um valor válido."}), 400
    if valor <= 0:
        return jsonify({"erro": "O valor do depósito deve ser maior que zero."}), 400
    try:
        data_deposito = date.fromisoformat(str(corpo.get("data") or date.today())).isoformat()
    except ValueError:
        return jsonify({"erro": "Informe uma data válida."}), 400
    meta.setdefault("depositos", {})[str(numero)] = {
        "numero": numero, "valor": valor, "banco_id": banco_id, "metodo": metodo,
        "detalhes": str(corpo.get("detalhes", "")).strip(), "data": data_deposito,
    }
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados, meta_id)})


@app.route("/api/metas/<meta_id>/depositos/<int:numero>", methods=["DELETE"])
def remover_deposito(meta_id, numero):
    dados = carregar_dados()
    meta = buscar_meta(dados, meta_id)
    if not meta:
        return jsonify({"erro": "Meta não encontrada."}), 404
    meta.get("depositos", {}).pop(str(numero), None)
    salvar_dados(dados)
    return jsonify({"ok": True, **resposta_completa(dados, meta_id)})


if __name__ == "__main__":
    app.run(debug=True)

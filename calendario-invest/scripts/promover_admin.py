"""Promove uma conta existente a administradora usando DATABASE_URL."""

import os
import sys

import psycopg

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
import app  # noqa: E402


def main():
    if len(sys.argv) != 2 or "@" not in sys.argv[1]:
        raise SystemExit("Uso: python scripts/promover_admin.py email@example.com")
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise SystemExit("DATABASE_URL não configurada.")
    email = sys.argv[1].strip().casefold()
    with psycopg.connect(database_url) as conexao:
        app.preparar_banco(conexao)
        resultado = conexao.execute(
            "UPDATE usuarios SET papel = 'admin', ativo = TRUE WHERE email = %s RETURNING email",
            (email,),
        ).fetchone()
    if not resultado:
        raise SystemExit("Conta não encontrada.")
    print(f"Administrador promovido: {resultado[0]}")


if __name__ == "__main__":
    main()

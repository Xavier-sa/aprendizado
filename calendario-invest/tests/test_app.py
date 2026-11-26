import json
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch
from uuid import uuid4

import app as modulo


class CalendarioInvestTestCase(unittest.TestCase):
    def setUp(self):
        self.arquivo_original = modulo.DATA_FILE
        self.database_url_original = modulo.DATABASE_URL
        modulo.DATABASE_URL = None
        modulo.DATA_FILE = Path(__file__).parent / f".depositos-teste-{uuid4().hex}.json"
        modulo.DATA_FILE.write_text(
            json.dumps({"meta": 23450, "depositos": {}}), encoding="utf-8"
        )
        self.client = modulo.app.test_client()
        with self.client.session_transaction() as sessao:
            sessao["usuario_id"] = "00000000-0000-0000-0000-000000000001"

    def tearDown(self):
        modulo.DATA_FILE.unlink(missing_ok=True)
        modulo.DATA_FILE = self.arquivo_original
        modulo.DATABASE_URL = self.database_url_original

    def dados(self):
        return self.client.get("/api/dados").get_json()

    def test_home_publica_exibe_oito_capturas(self):
        visitante = modulo.app.test_client()
        pagina = visitante.get("/")
        self.assertEqual(pagina.data.count(b'aria-haspopup="dialog"'), 8)
        for arquivo, _, _ in modulo.TUTORIAL:
            with visitante.get(f"/tutorial/capturas/{arquivo}") as captura:
                self.assertEqual(captura.status_code, 200)
                self.assertEqual(captura.mimetype, "image/png")
        self.assertEqual(visitante.get("/tutorial/capturas/outro.png").status_code, 404)

    def test_paginas_legais_publicas(self):
        visitante = modulo.app.test_client()
        for caminho, titulo in (("/termos", "Termos de uso"), ("/privacidade", "Privacidade e LGPD")):
            with self.subTest(caminho=caminho):
                resposta = visitante.get(caminho)
                self.assertEqual(resposta.status_code, 200)
                self.assertIn(titulo.encode(), resposta.data)

    def test_api_rejeita_sessao_de_conta_desativada(self):
        with patch.object(modulo, "DATABASE_URL", "postgresql://exemplo"), patch.object(
            modulo, "buscar_usuario_por_id", return_value=("id", "Pessoa", "p@example.com", "usuario", False)
        ):
            self.assertEqual(self.client.get("/api/dados").status_code, 401)

    def test_exige_login_na_pagina_e_na_api(self):
        with self.client.session_transaction() as sessao:
            sessao.clear()
        inicio = self.client.get("/")
        self.assertEqual(inicio.status_code, 200)
        self.assertIn(b"Como funciona", inicio.data)
        pagina = self.client.get("/painel")
        self.assertEqual(pagina.status_code, 302)
        self.assertTrue(pagina.headers["Location"].endswith("/entrar"))
        api = self.client.get("/api/dados")
        self.assertEqual(api.status_code, 401)

    def test_valida_senha_minima_no_cadastro(self):
        with self.client.session_transaction() as sessao:
            sessao.clear()
        resposta = self.client.post("/cadastro", data={
            "nome": "Pessoa", "email": "pessoa@example.com", "senha": "curta",
        })
        self.assertEqual(resposta.status_code, 200)
        self.assertIn("pelo menos 8 caracteres".encode(), resposta.data)

    def test_usuario_comum_nao_acessa_administracao(self):
        with patch.object(modulo, "buscar_usuario_por_id", return_value=(
            "00000000-0000-0000-0000-000000000001", "Pessoa", "pessoa@example.com", "usuario", True
        )):
            resposta = self.client.get("/admin/usuarios")
        self.assertEqual(resposta.status_code, 302)
        self.assertTrue(resposta.headers["Location"].endswith("/painel"))

    def test_modelo_de_despesas_fica_vinculado_ao_administrador(self):
        class ConexaoFalsa:
            def __init__(self):
                self.comandos = []

            def execute(self, comando):
                self.comandos.append(comando)

        conexao = ConexaoFalsa()
        modulo.preparar_banco(conexao)
        esquema = " ".join(conexao.comandos)
        self.assertIn("CREATE TABLE IF NOT EXISTS despesas_admin", esquema)
        self.assertIn("usuario_id UUID NOT NULL REFERENCES usuarios(id)", esquema)
        self.assertIn("valor NUMERIC(12, 2)", esquema)
        self.assertIn("pago BOOLEAN NOT NULL DEFAULT FALSE", esquema)

        with patch.object(modulo, "buscar_usuario_por_id", return_value=(
            "00000000-0000-0000-0000-000000000001", "Pessoa", "pessoa@example.com", "usuario", True
        )):
            resposta = self.client.get("/admin/despesas")
        self.assertEqual(resposta.status_code, 302)
        self.assertTrue(resposta.headers["Location"].endswith("/painel"))

    def test_calcula_quantidade_arredondando_para_cima(self):
        self.assertEqual(modulo.calcular_quantidade(23436), 216)
        self.assertEqual(modulo.calcular_quantidade(23437), 217)
        self.assertEqual(modulo.calcular_quantidade(23653.01), 218)

    def test_resumo_caderno_separa_desconto_pagamento_parcial_e_valor_desconhecido(self):
        despesas = [
            dict(valor="5200.00", valor_pago="100.00", desconto="50.00"),
            dict(valor="", valor_pago="20.00"),
            dict(valor="0.00", valor_pago=""),
            dict(valor="100.00", valor_atrasado="100.00"),
        ]
        self.assertEqual([modulo.situacao_despesa(item) for item in despesas],
                         ["parcial", "sem-valor", "paga", "atrasada"])
        resumo = modulo.resumo_despesas(despesas)
        self.assertEqual((resumo["previsto"], resumo["pago"], resumo["restante"], resumo["pendentes"]),
                         ("R$ 5.300,00", "R$ 120,00", "R$ 5.150,00", 1))
        self.assertEqual(modulo.ler_valor_despesa("5.200,00"), "5200.00")

    def test_caderno_exibe_mes_e_carrega_apenas_dados_previstos_das_fixas(self):
        from datetime import date

        conexao = MagicMock()
        conexao.execute.return_value.fetchall.return_value = [
            ("fixa", "Nome antigo", "mensal", None, False, date(2026, 11, 1),
             dict(nome="Aula de música", descricao="", fixa=True, valor="5200.00",
                  valor_pago="180.00", desconto="25.00"), "fixa"),
            ("unica", "Compra única", "avulsa", None, False, date(2026, 11, 1),
             dict(nome="Compra única", descricao="", fixa=False, valor="100.00"), "caderno-unica"),
        ]
        with patch.object(modulo, "buscar_usuario_por_id", return_value=("id", "Admin", "", "admin", True)), \
             patch.object(modulo, "connect") as conectar:
            conectar.return_value.__enter__.return_value = conexao
            resposta = self.client.get("/admin/despesas?mes=2026-12")
        pagina = resposta.get_data(as_text=True)
        self.assertEqual(resposta.status_code, 200)
        self.assertIn("Dezembro de 2026", pagina)
        self.assertIn("Aula de música", pagina)
        self.assertIn("R$ 5.200,00", pagina)
        self.assertNotIn("Compra única", pagina)
        self.assertNotIn("180,00", pagina)
        self.assertNotIn("25,00", pagina)

    def test_caderno_cadastra_e_edita_no_mes_vinculado_ao_admin(self):
        conexao = MagicMock()
        conexao.execute.return_value.rowcount = 1
        existente = str(uuid4())
        formulario = dict(mes="2026-12", nome="Feira", recorrencia="esporadica",
                          valor="1.200,00", valor_pago="100,00", desconto="25,00")
        with patch.object(modulo, "buscar_usuario_por_id", return_value=("id", "Admin", "", "admin", True)), \
             patch.object(modulo, "connect") as conectar:
            conectar.return_value.__enter__.return_value = conexao
            for rota in ("/admin/despesas/nova", f"/admin/despesas/{existente}/editar"):
                self.assertTrue(self.client.post(rota, data=formulario).location.endswith("?mes=2026-12"))
        comandos = conexao.execute.call_args_list
        self.assertEqual(sum("INSERT INTO despesas_admin (" in c.args[0] for c in comandos), 1)
        gravacoes = [c.args[1] for c in comandos if "INSERT INTO despesas_admin_mes" in c.args[0]]
        self.assertEqual(len(gravacoes), 2)
        self.assertEqual(gravacoes[-1][2:], (existente, "00000000-0000-0000-0000-000000000001"))
        self.assertEqual(gravacoes[-1][1].obj["valor_pago"], "100.00")
        self.assertEqual(gravacoes[-1][1].obj["desconto"], "25.00")
        self.assertFalse(gravacoes[-1][1].obj["fixa"])

    def test_usa_diretorio_temporario_na_vercel(self):
        caminho = modulo.caminho_dados({"VERCEL": "1"})
        self.assertEqual(caminho, Path("/tmp/calendario-invest-depositos.json"))

    def test_variavel_de_ambiente_define_arquivo_persistente(self):
        caminho = modulo.caminho_dados({"CALENDARIO_DATA_FILE": "dados/teste.json"})
        self.assertEqual(caminho, Path("dados/teste.json"))

    def test_direciona_leitura_e_escrita_para_postgres(self):
        modulo.DATABASE_URL = "postgresql://exemplo"
        with patch.object(modulo, "carregar_dados_postgres", return_value={"metas": []}) as ler:
            self.assertEqual(modulo.carregar_dados(), {"metas": []})
            ler.assert_called_once_with()
        with patch.object(modulo, "salvar_dados_postgres") as salvar:
            modulo.salvar_dados({"metas": []})
            salvar.assert_called_once_with({"metas": []})

    def test_migra_formato_antigo_preservando_deposito_e_banco(self):
        modulo.DATA_FILE.write_text(json.dumps({
            "meta": 100,
            "depositos": {"1": {"numero": 1, "valor": 1, "banco": "Banco Azul",
                                    "metodo": "Pix", "detalhes": "", "data": "2026-11-18"}},
        }), encoding="utf-8")
        dados = self.dados()
        self.assertEqual(dados["meta_ativa"]["nome"], "Meta 1")
        self.assertEqual(dados["meta_ativa"]["depositos"]["1"]["banco"], "Banco Azul")
        self.assertEqual(dados["bancos"][0]["nome"], "Banco Azul")

    def test_cria_varias_metas_com_depositos_independentes(self):
        banco = self.client.post("/api/bancos", json={"nome": "Nubank"}).get_json()["bancos"][0]
        nova = self.client.post("/api/metas", json={"nome": "Viagem", "valor": 300})
        self.assertEqual(nova.status_code, 201)
        meta = nova.get_json()["meta_ativa"]
        deposito = self.client.post(f"/api/metas/{meta['id']}/depositos/1", json={
            "valor": 1, "banco_id": banco["id"], "metodo": "Pix", "data": "2026-11-18",
        })
        self.assertEqual(deposito.status_code, 200)
        self.assertEqual(deposito.get_json()["meta_ativa"]["concluido"], 1)
        self.assertEqual(len(deposito.get_json()["metas"]), 2)
        primeira = deposito.get_json()["metas"][0]
        self.assertEqual(primeira["concluido"], 0)

    def test_cria_e_atualiza_meta_recalculando_quantidade(self):
        nova = self.client.post("/api/metas", json={"nome": "Notebook", "valor": 100})
        self.assertEqual(nova.status_code, 201)
        meta = nova.get_json()["meta_ativa"]
        self.assertEqual(meta["quantidade"], 14)
        self.assertEqual(meta["soma_sugerida"], 105)

        atualizada = self.client.put(
            f"/api/metas/{meta['id']}", json={"nome": "Notebook", "valor": 106}
        )
        self.assertEqual(atualizada.status_code, 200)
        resumo = atualizada.get_json()["meta_ativa"]
        self.assertEqual(resumo["quantidade"], 15)
        self.assertEqual(resumo["soma_sugerida"], 120)

    def test_rejeita_banco_duplicado_e_banco_em_uso(self):
        primeira = self.client.post("/api/bancos", json={"nome": "Inter"})
        banco = primeira.get_json()["bancos"][0]
        duplicado = self.client.post("/api/bancos", json={"nome": "inter"})
        self.assertEqual(duplicado.status_code, 409)
        meta = self.dados()["meta_ativa"]
        self.client.post(f"/api/metas/{meta['id']}/depositos/1", json={
            "valor": 1, "banco_id": banco["id"], "metodo": "Pix", "data": "2026-11-18",
        })
        remocao = self.client.delete(f"/api/bancos/{banco['id']}")
        self.assertEqual(remocao.status_code, 409)

    def test_renomeia_banco_e_mantem_vinculo_com_deposito(self):
        banco = self.client.post("/api/bancos", json={"nome": "Nome antigo"}).get_json()["bancos"][0]
        meta = self.dados()["meta_ativa"]
        self.client.post(f"/api/metas/{meta['id']}/depositos/1", json={
            "valor": 1, "banco_id": banco["id"], "metodo": "Pix", "data": "2026-11-24",
        })
        resposta = self.client.put(f"/api/bancos/{banco['id']}", json={"nome": "Nome novo"})
        self.assertEqual(resposta.status_code, 200)
        dados = resposta.get_json()
        self.assertEqual(dados["bancos"][0]["nome"], "Nome novo")
        self.assertEqual(dados["meta_ativa"]["depositos"]["1"]["banco"], "Nome novo")

    def test_valida_meta_e_mantem_ao_menos_uma(self):
        invalida = self.client.post("/api/metas", json={"nome": "Inválida", "valor": 0})
        self.assertEqual(invalida.status_code, 400)
        meta_id = self.dados()["meta_ativa"]["id"]
        remocao = self.client.delete(f"/api/metas/{meta_id}")
        self.assertEqual(remocao.status_code, 400)

    def test_renderiza_pagina_principal(self):
        resposta = self.client.get("/painel")
        self.assertEqual(resposta.status_code, 200)
        self.assertIn("Calendário Invest".encode(), resposta.data)


if __name__ == "__main__":
    unittest.main()

import json
from pathlib import Path
import unittest
from unittest.mock import patch
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

    def tearDown(self):
        modulo.DATA_FILE.unlink(missing_ok=True)
        modulo.DATA_FILE = self.arquivo_original
        modulo.DATABASE_URL = self.database_url_original

    def dados(self):
        return self.client.get("/api/dados").get_json()

    def test_calcula_quantidade_arredondando_para_cima(self):
        self.assertEqual(modulo.calcular_quantidade(23436), 216)
        self.assertEqual(modulo.calcular_quantidade(23437), 217)
        self.assertEqual(modulo.calcular_quantidade(23653.01), 218)

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
        resposta = self.client.get("/")
        self.assertEqual(resposta.status_code, 200)
        self.assertIn("Calendário Invest".encode(), resposta.data)


if __name__ == "__main__":
    unittest.main()

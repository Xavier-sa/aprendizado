import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

import app as modulo


class CalendarioInvestTestCase(unittest.TestCase):
    def setUp(self):
        self.pasta = TemporaryDirectory()
        self.arquivo_original = modulo.DATA_FILE
        modulo.DATA_FILE = Path(self.pasta.name) / "depositos.json"
        modulo.DATA_FILE.write_text(
            json.dumps({"meta": 23450, "depositos": {}}), encoding="utf-8"
        )
        self.client = modulo.app.test_client()

    def tearDown(self):
        modulo.DATA_FILE = self.arquivo_original
        self.pasta.cleanup()

    def dados(self):
        return self.client.get("/api/dados").get_json()

    def test_calcula_quantidade_arredondando_para_cima(self):
        self.assertEqual(modulo.calcular_quantidade(23436), 216)
        self.assertEqual(modulo.calcular_quantidade(23437), 217)
        self.assertEqual(modulo.calcular_quantidade(23653.01), 218)

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

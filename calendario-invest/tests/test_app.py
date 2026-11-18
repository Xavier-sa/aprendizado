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

    def test_calcula_quantidade_arredondando_para_cima(self):
        self.assertEqual(modulo.calcular_quantidade(23436), 216)
        self.assertEqual(modulo.calcular_quantidade(23437), 217)
        self.assertEqual(modulo.calcular_quantidade(23653.01), 218)

    def test_atualiza_meta_e_persiste_dados(self):
        resposta = self.client.post("/api/meta", json={"meta": 23450})
        self.assertEqual(resposta.status_code, 200)
        self.assertEqual(resposta.get_json()["quantidade"], 217)
        self.assertEqual(resposta.get_json()["soma_sugerida"], 23653)

    def test_rejeita_meta_invalida(self):
        resposta = self.client.post("/api/meta", json={"meta": 0})
        self.assertEqual(resposta.status_code, 400)

    def test_renderiza_pagina_principal(self):
        resposta = self.client.get("/")
        self.assertEqual(resposta.status_code, 200)
        self.assertIn(b"window.APP_CONFIG", resposta.data)


if __name__ == "__main__":
    unittest.main()

import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from unir_videos import descobrir, executar, main, ordenar, verificar_hashes


class MontagemTest(unittest.TestCase):
    def test_ordem_explicita(self):
        a, b = Path("a.mp4"), Path("b.mp4")
        self.assertEqual(ordenar([a, b], ["b.mp4", "a.mp4"]), [b, a])
        with self.assertRaisesRegex(ValueError, "sequência"):
            ordenar([a, b], None)

    def test_arquivo_ausente(self):
        with self.assertRaisesRegex(ValueError, "ausente"):
            ordenar([Path("a.mp4")], ["b.mp4"])

    def test_duplicados_por_conteudo(self):
        with tempfile.TemporaryDirectory() as pasta:
            a, b = Path(pasta, "a.mp4"), Path(pasta, "b.mp4")
            a.write_bytes(b"mesmo conteudo")
            b.write_bytes(a.read_bytes())
            with self.assertRaisesRegex(ValueError, "duplicados"):
                verificar_hashes(descobrir(Path(pasta)))
            hashes = verificar_hashes([a, b], permitir_duplicados=True)
            self.assertEqual(hashes[a.name], hashes[b.name])

    @patch("unir_videos.subprocess.run")
    def test_falha_de_ferramenta(self, run):
        run.return_value.returncode = 1
        run.return_value.stderr = "entrada inválida"
        with self.assertRaisesRegex(ValueError, "entrada inválida"):
            executar("ffmpeg")

    @patch("builtins.print")
    def test_falha_grava_relatorio_sem_mp4(self, _):
        with tempfile.TemporaryDirectory() as pasta:
            self.assertEqual(main([pasta, "--ordem", "ausente.mp4"]), 1)
            self.assertFalse(Path(pasta, "output", "wx-meta-tutorial.mp4").exists())
            self.assertIn("Arquivo ausente",
                          Path(pasta, "reports", "validacao.json").read_text())

    @patch("builtins.print")
    def test_preserva_relatorio_existente(self, _):
        with tempfile.TemporaryDirectory() as pasta:
            relatorio = Path(pasta, "reports", "validacao.json")
            relatorio.parent.mkdir()
            relatorio.write_text("original")
            self.assertEqual(main([pasta, "--ordem", "ausente.mp4"]), 1)
            self.assertEqual(relatorio.read_text(), "original")

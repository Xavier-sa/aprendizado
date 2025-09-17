import unittest
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from aluno import calcular_media, determinar_situacao

class TestAvaliacaoEscolar(unittest.TestCase):
    
    # Testes para calcular_media
    def test_media_calculo_correto(self):
        """Testa cálculo correto da média"""
        self.assertAlmostEqual(calcular_media(7.0, 8.0, 9.0), 8.0)
        self.assertAlmostEqual(calcular_media(5.5, 6.5, 7.5), 6.5)
        self.assertAlmostEqual(calcular_media(10, 10, 10), 10.0)
    
    def test_media_notas_limites(self):
        """Testa notas nos limites (0 e 10)"""
        self.assertAlmostEqual(calcular_media(0, 0, 0), 0.0)
        self.assertAlmostEqual(calcular_media(10, 10, 10), 10.0)
        self.assertAlmostEqual(calcular_media(0, 5, 10), 5.0)
    
    def test_media_notas_invalidas(self):
        """Testa validação de notas"""
        with self.assertRaises(ValueError):
            calcular_media(-1, 8, 9)
        with self.assertRaises(ValueError):
            calcular_media(7, 11, 9)
        with self.assertRaises(ValueError):
            calcular_media(5, 8, -5)
    
    # Testes para determinar_situacao
    def test_aprovado(self):
        """Testa situação 'Aprovado'"""
        self.assertEqual(determinar_situacao(7.0, 75.0), "Aprovado")
        self.assertEqual(determinar_situacao(8.5, 80.0), "Aprovado")
        self.assertEqual(determinar_situacao(10.0, 100.0), "Aprovado")
        self.assertEqual(determinar_situacao(7.0, 100.0), "Aprovado")
    
    def test_recuperacao(self):
        """Testa situação 'Recuperação'"""
        self.assertEqual(determinar_situacao(5.0, 75.0), "Recuperação")
        self.assertEqual(determinar_situacao(6.9, 80.0), "Recuperação")
        self.assertEqual(determinar_situacao(5.5, 90.0), "Recuperação")
        self.assertEqual(determinar_situacao(6.0, 75.0), "Recuperação")
    
    def test_reprovado(self):
        """Testa situação 'Reprovado'"""
        # Reprovado por nota
        self.assertEqual(determinar_situacao(4.9, 75.0), "Reprovado")
        self.assertEqual(determinar_situacao(3.0, 80.0), "Reprovado")
        
        # Reprovado por frequência
        self.assertEqual(determinar_situacao(7.0, 74.9), "Reprovado")
        self.assertEqual(determinar_situacao(10.0, 70.0), "Reprovado")
        
        # Reprovado por ambos
        self.assertEqual(determinar_situacao(4.0, 50.0), "Reprovado")
    
    def test_frequencia_invalida(self):
        """Testa validação de frequência"""
        with self.assertRaises(ValueError):
            determinar_situacao(7.0, -10.0)
        with self.assertRaises(ValueError):
            determinar_situacao(5.0, 150.0)

class TestCasosEspecificos(unittest.TestCase):
    """Casos específicos de teste"""
    
    def test_casos_limite(self):
        """Testa casos nos limites das faixas"""
        # Limite aprovação/recuperação
        self.assertEqual(determinar_situacao(7.0, 75.0), "Aprovado")
        self.assertEqual(determinar_situacao(6.999, 75.0), "Recuperação")
        
        # Limite recuperação/reprovação
        self.assertEqual(determinar_situacao(5.0, 75.0), "Recuperação")
        self.assertEqual(determinar_situacao(4.999, 75.0), "Reprovado")
        
        # Limite de frequência
        self.assertEqual(determinar_situacao(7.0, 75.0), "Aprovado")
        self.assertEqual(determinar_situacao(7.0, 74.999), "Reprovado")

def run_tests():
    """Função para executar os testes"""
    unittest.main(verbosity=2)

if __name__ == "__main__":
    run_tests()
import unittest
from unittest.mock import patch
from io import StringIO
import datetime
import sys
import os

# Adiciona o diretório atual ao path para importar o módulo gasto
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importa o módulo principal
import gasto as gasto

class TestSistemaGastos(unittest.TestCase):
    
    def setUp(self):
        """Prepara o ambiente de teste resetando os gastos"""
        gasto.gastos = {
            "Moradia": [],
            "Lazer": [],
            "Investimentos": [],
            "Alimentação": [],
            "Transporte": [],
            "Saúde": [],
            "Outros": []
        }
    
    def test_registrar_gasto_valido(self):
        """Testa o registro de um gasto válido"""
        # Simula entrada do usuário: Categoria Lazer (2), Valor 100, Descrição "Teste", Data vazia
        with patch('builtins.input', side_effect=['2', '100', 'Teste', '']):
            gasto.registrar_gasto()
        
        # Verifica se o gasto foi registrado corretamente
        self.assertEqual(len(gasto.gastos["Lazer"]), 1)
        self.assertEqual(gasto.gastos["Lazer"][0][1], 100.0)
        self.assertEqual(gasto.gastos["Lazer"][0][2], "Teste")
        self.assertEqual(gasto.gastos["Lazer"][0][0], datetime.date.today())
    
    def test_registrar_gasto_categoria_invalida(self):
        """Testa o tratamento de categoria inválida"""
        # Simula entrada inválida: categoria 99 (inexistente)
        with patch('builtins.input', side_effect=['99']):
            with patch('sys.stdout', new=StringIO()) as fake_output:
                gasto.registrar_gasto()
                output = fake_output.getvalue()
        
        # Verifica se a mensagem de erro foi exibida
        self.assertIn("Categoria inválida", output)
        
        # Verifica que nenhum gasto foi registrado
        for categoria in gasto.gastos.values():
            self.assertEqual(len(categoria), 0)
    
    def test_registrar_gasto_valor_invalido(self):
        """Testa o tratamento de valor inválido"""
        # Simula entrada inválida: valor "abc" (não numérico)
        with patch('builtins.input', side_effect=['1', 'abc']):
            with patch('sys.stdout', new=StringIO()) as fake_output:
                gasto.registrar_gasto()
                output = fake_output.getvalue()
        
        # Verifica se a mensagem de erro foi exibida
        self.assertIn("Valor inválido", output)
        
        # Verifica que nenhum gasto foi registrado
        for categoria in gasto.gastos.values():
            self.assertEqual(len(categoria), 0)
    
    def test_relatorio_por_categoria_vazio(self):
        """Testa o relatório por categoria quando não há gastos"""
        with patch('sys.stdout', new=StringIO()) as fake_output:
            gasto.relatorio_por_categoria()
            output = fake_output.getvalue()
        
        # Verifica se todas as categorias aparecem com valor zero
        for categoria in gasto.gastos.keys():
            self.assertIn(f"{categoria}: R$ 0.00", output)
        
        # Verifica se o total geral é zero
        self.assertIn("Total Geral: R$ 0.00", output)
    
    def test_relatorio_por_categoria_com_dados(self):
        """Testa o relatório por categoria com dados registrados"""
        # Adiciona alguns gastos manualmente para teste
        hoje = datetime.date.today()
        gasto.gastos["Moradia"].append((hoje, 500.0, "Aluguel"))
        gasto.gastos["Lazer"].append((hoje, 100.0, "Cinema"))
        gasto.gastos["Lazer"].append((hoje, 50.0, "Jantar"))
        
        with patch('sys.stdout', new=StringIO()) as fake_output:
            gasto.relatorio_por_categoria()
            output = fake_output.getvalue()
        
        # Verifica se os totais estão corretos
        self.assertIn("Moradia: R$ 500.00", output)
        self.assertIn("Lazer: R$ 150.00", output)
        self.assertIn("Total Geral: R$ 650.00", output)
        
        # Verifica se as porcentagens estão sendo calculadas
        self.assertIn("Porcentagem do total por categoria:", output)
    
    def test_relatorio_por_periodo(self):
        """Testa o relatório por período"""
        # Adiciona gastos em datas diferentes
        data1 = datetime.date(2023, 10, 1)
        data2 = datetime.date(2023, 10, 15)
        data3 = datetime.date(2023, 11, 1)  # Fora do período
        
        gasto.gastos["Moradia"].append((data1, 500.0, "Aluguel"))
        gasto.gastos["Lazer"].append((data2, 100.0, "Cinema"))
        gasto.gastos["Investimentos"].append((data3, 200.0, "Ações"))  # Fora do período
        
        # Simula entrada de datas: 01/10/2023 a 20/10/2023
        with patch('builtins.input', side_effect=['01/10/2023', '20/10/2023']):
            with patch('sys.stdout', new=StringIO()) as fake_output:
                gasto.relatorio_por_periodo()
                output = fake_output.getvalue()
        
        # Verifica se apenas os gastos do período aparecem
        self.assertIn("Moradia: R$ 500.00", output)
        self.assertIn("Lazer: R$ 100.00", output)
        self.assertNotIn("Investimentos: R$ 200.00", output)
        self.assertIn("Total no período: R$ 600.00", output)

def executar_testes():
    """Função para executar todos os testes"""
    print("Executando testes do sistema de controle de gastos...")
    
    # Cria uma suíte de testes
    test_suite = unittest.TestLoader().loadTestsFromTestCase(TestSistemaGastos)
    
    # Executa os testes
    test_runner = unittest.TextTestRunner(verbosity=2)
    resultado = test_runner.run(test_suite)
    
    # Exibe um resumo
    print(f"\nResumo dos testes:")
    print(f"Testes executados: {resultado.testsRun}")
    print(f"Falhas: {len(resultado.failures)}")
    print(f"Erros: {len(resultado.errors)}")
    
    if resultado.wasSuccessful():
        print("✅ Todos os testes passaram!")
    else:
        print("❌ Alguns testes falharam.")
    
    return resultado.wasSuccessful()

if __name__ == "__main__":
    executar_testes()
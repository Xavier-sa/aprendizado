#!/usr/bin/env python3
"""
Script para executar testes automatizados
"""
import subprocess
import sys

def run_tests():
    """Executa os testes unitários"""
    print("Executando testes unitários...\n")
    result = subprocess.run([
        sys.executable, "-m", "unittest", 
        "test_aluno.TestAvaliacaoEscolar", "-v"
    ], capture_output=True, text=True)
    
    print(result.stdout)
    if result.stderr:
        print("Erros:", result.stderr)
    
    return result.returncode == 0

def run_specific_test(test_class, test_method):
    """Executa um teste específico"""
    print(f"Executando {test_class}.{test_method}...\n")
    result = subprocess.run([
        sys.executable, "-m", "unittest", 
        f"test_aluno.{test_class}.{test_method}", "-v"
    ], capture_output=True, text=True)
    
    print(result.stdout)
    return result.returncode == 0

if __name__ == "__main__":
    # Executar todos os testes
    success = run_tests()
    
    # Executar testes específicos (exemplo)
    # run_specific_test("TestAvaliacaoEscolar", "test_aprovado")
    
    sys.exit(0 if success else 1)
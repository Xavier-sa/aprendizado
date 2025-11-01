"""
Sistema de Gerenciamento de Caminhões - Estrutura MVC unificada em um único arquivo
"""





# ==============================================================================
# 2. CONTROLLER (controller.py)
# ==============================================================================

# ==============================================================================
# 3. VIEW (view.py)
# ==============================================================================

# ==============================================================================
# 4. ARQUIVO PRINCIPAL (main.py)
# ==============================================================================
def main():
    print("Inicializando Sistema de Gerenciamento de Caminhões...")
    sistema = SistemaView()
    sistema.exibir_menu_principal()

if __name__ == "__main__":
    main()
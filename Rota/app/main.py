from views.sistema_view import SistemaView
"""
Sistema de Gerenciamento de Caminhões - Estrutura MVC unificada em um único arquivo
"""

def main():
    print("Inicializando Sistema de Gerenciamento de Caminhões...")
    sistema = SistemaView()
    sistema.exibir_menu_principal()

if __name__ == "__main__":
    main()1
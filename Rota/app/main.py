from views.sistema_view import SistemaView

def main():
    print("Inicializando Sistema de Gerenciamento de Caminhões...")
    sistema = SistemaView()
    sistema.exibir_menu_principal()

if __name__ == "__main__":
    main()
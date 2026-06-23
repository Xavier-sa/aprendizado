import logging

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(message)s')

# Dicionário com estoque inicial de 5 produtos
estoque = {
    "Arroz": 100,
    "Feijão": 100,
    "Macarrão": 100,
    "Óleo": 100,
    "Sal": 100
}

def exibir_estoque():
    logging.info("📦 Estoque Atual:")
    for produto, quantidade in estoque.items():
        logging.info(f" - {produto}: {quantidade} unidades")
    logging.info("-" * 30)

def vender(produto, quantidade):
    if produto not in estoque:
        logging.warning("⚠ Produto não encontrado.")
        return
    if estoque[produto] < quantidade:
        logging.warning("❌ Estoque insuficiente para a venda.")
        return
    estoque[produto] -= quantidade
    logging.info(f"✅ Venda realizada: {quantidade}x {produto}")

def comprar(produto, quantidade):
    if produto not in estoque:
        logging.warning("⚠ Produto não encontrado.")
        return
    estoque[produto] += quantidade
    logging.info(f"✅ Compra realizada: {quantidade}x {produto} adicionados ao estoque")

def menu():
    while True:
        logging.info("\n--- Sistema de Compra e Venda ---")
        logging.info("1 - Ver estoque")
        logging.info("2 - Vender produto")
        logging.info("3 - Comprar produto")
        logging.info("4 - Sair")
        escolha = input("Escolha uma opção: ")

        if escolha == "1":
            exibir_estoque()
        elif escolha == "2":
            produto = input("Produto: ").capitalize()
            try:
                qtd = int(input("Quantidade: "))
                vender(produto, qtd)
            except ValueError:
                logging.warning("❌ Quantidade inválida.")
        elif escolha == "3":
            produto = input("Produto: ").capitalize()
            try:
                qtd = int(input("Quantidade: "))
                comprar(produto, qtd)
            except ValueError:
                logging.warning("❌ Quantidade inválida.")
        elif escolha == "4":
            logging.info("Saindo... Até logo!")
            break
        else:
            logging.warning("❌ Opção inválida.")

# Inicia o sistema
menu()

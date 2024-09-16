import sqlite3

# Função para conectar ao banco de dados
def connect_db():
    conn = sqlite3.connect('products.db')
    return conn

# Função para criar a tabela de produtos
def create_table():
    with connect_db() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                total REAL NOT NULL
            )
        ''')
        conn.commit()

# Função para adicionar um produto
def add_product(item, price, quantity):
    total = price * quantity
    with connect_db() as conn:
        conn.execute('INSERT INTO products (item, price, quantity, total) VALUES (?, ?, ?, ?)',
                     (item, price, quantity, total))
        conn.commit()

# Função para exibir todos os produtos e o total geral
def display_products():
    with connect_db() as conn:
        cur = conn.cursor()
        cur.execute('SELECT * FROM products')
        products = cur.fetchall()
        total_sum = sum(row[4] for row in products)  # Somar os totais

        print("\nProdutos Adicionados:")
        print(f"{'Item':<20} {'Preço':<10} {'Quantidade':<10} {'Total':<10}")
        print("-" * 50)
        for row in products:
            print(f"{row[1]:<20} {row[2]:<10.2f} {row[3]:<10} {row[4]:<10.2f}")

        print("\nTotal Geral: R$", f"{total_sum:.2f}")

# Função principal para interagir com o usuário
def main():
    create_table()
    while True:
        print("\n1. Adicionar produto")
        print("2. Mostrar produtos")
        print("3. Sair")

        choice = input("Escolha uma opção: ")
        if choice == '1':
            item = input("Digite o nome do item: ")
            price = float(input("Digite o preço do item: "))
            quantity = int(input("Digite a quantidade: "))
            add_product(item, price, quantity)
        elif choice == '2':
            display_products()
        elif choice == '3':
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == '__main__':
    main()

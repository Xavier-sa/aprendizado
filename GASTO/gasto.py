import datetime

# Dicionário para armazenar gastos: {categoria: [(data, valor, descrição), ...]}
gastos = {
    "Moradia": [],
    "Lazer": [],
    "Investimentos": [],
    "Alimentação": [],
    "Transporte": [],
    "Saúde": [],
    "Outros": []
}

def registrar_gasto():
    print("\n--- Registrar Novo Gasto ---")
    print("Categorias disponíveis:")
    categorias = list(gastos.keys())
    for i, cat in enumerate(categorias, 1):
        print(f"{i}. {cat}")
    
    try:
        escolha = int(input("Escolha o número da categoria: ")) - 1
        if escolha < 0 or escolha >= len(categorias):
            print("Categoria inválida!")
            return
        categoria = categorias[escolha]
    except ValueError:
        print("Por favor, digite um número válido.")
        return
    
    try:
        valor = float(input("Valor gasto: R$ "))
        if valor <= 0:
            print("O valor deve ser positivo!")
            return
    except ValueError:
        print("Valor inválido!")
        return
        
    descricao = input("Descrição (opcional): ").strip()
    if not descricao:
        descricao = "Sem descrição"
    
    data_str = input("Data (DD/MM/AAAA, ou Enter para hoje): ").strip()
    if not data_str:
        data = datetime.date.today()
    else:
        try:
            data = datetime.datetime.strptime(data_str, "%d/%m/%Y").date()
        except ValueError:
            print("Formato de data inválido! Usando data de hoje.")
            data = datetime.date.today()
    
    gastos[categoria].append((data, valor, descricao))
    print(f"Gasto de R$ {valor:.2f} registrado em {categoria}!")

def relatorio_por_categoria():
    print("\n--- Relatório por Categoria ---")
    total_geral = 0
    for categoria, registros in gastos.items():
        if registros:
            total_cat = sum(valor for (data, valor, desc) in registros)
            total_geral += total_cat
            print(f"{categoria}: R$ {total_cat:.2f}")
        else:
            print(f"{categoria}: R$ 0.00")
    
    print(f"\nTotal Geral: R$ {total_geral:.2f}")
    
    if total_geral > 0:
        print("\nPorcentagem do total por categoria:")
        for categoria, registros in gastos.items():
            total_cat = sum(valor for (data, valor, desc) in registros)
            porcentagem = (total_cat / total_geral) * 100
            print(f"{categoria}: {porcentagem:.1f}%")

def relatorio_por_periodo():
    print("\n--- Relatório por Período ---")
    try:
        data_inicio_str = input("Data de início (DD/MM/AAAA): ")
        data_fim_str = input("Data de fim (DD/MM/AAAA): ")
        
        data_inicio = datetime.datetime.strptime(data_inicio_str, "%d/%m/%Y").date()
        data_fim = datetime.datetime.strptime(data_fim_str, "%d/%m/%Y").date()
    except ValueError:
        print("Formato de data inválido! Use DD/MM/AAAA.")
        return
    
    print(f"\nGastos entre {data_inicio} e {data_fim}:")
    total_periodo = 0
    for categoria, registros in gastos.items():
        gastos_cat = [(data, valor, desc) for (data, valor, desc) in registros if data_inicio <= data <= data_fim]
        if gastos_cat:
            total_cat = sum(valor for (data, valor, desc) in gastos_cat)
            total_periodo += total_cat
            print(f"{categoria}: R$ {total_cat:.2f}")
            for data, valor, desc in gastos_cat:
                print(f"  {data}: R$ {valor:.2f} - {desc}")
    
    print(f"\nTotal no período: R$ {total_periodo:.2f}")

def menu_principal():
    while True:
        print("\n=== Controle de Gastos Pessoais ===")
        print("1. Registrar novo gasto")
        print("2. Relatório por categoria")
        print("3. Relatório por período")
        print("4. Sair")
        
        opcao = input("Escolha uma opção: ").strip()
        
        if opcao == "1":
            registrar_gasto()
        elif opcao == "2":
            relatorio_por_categoria()
        elif opcao == "3":
            relatorio_por_periodo()
        elif opcao == "4":
            print("Saindo do sistema. Até mais!")
            break
        else:
            print("Opção inválida! Tente novamente.")

# Executar o programa
if __name__ == "__main__":
    menu_principal()
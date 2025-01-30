using System;
using System.Collections.Generic;

class Produto
{
    public string Nome { get; set; }
    public double Preco { get; set; }
    public int Estoque { get; set; }

    public Produto(string nome, double preco, int estoque)
    {
        Nome = nome;
        Preco = preco;
        Estoque = estoque;
    }

    public void Vender(int quantidade)
    {
        if (quantidade <= Estoque)
        {
            Estoque -= quantidade;
            Console.WriteLine($"Venda realizada! {quantidade} {Nome}(s) vendido(s).");
        }
        else
        {
            Console.WriteLine($"Não há estoque suficiente para vender {quantidade} {Nome}(s).");
        }
    }

    public void AtualizarEstoque(int quantidade)
    {
        Estoque += quantidade;
        Console.WriteLine($"Estoque atualizado! Novo estoque de {Nome}: {Estoque} unidades.");
    }

    public void ExibirInformacoes()
    {
        Console.WriteLine($"Produto: {Nome}, Preço: R${Preco}, Estoque: {Estoque} unidades.");
    }
}

class Program
{
    static void Main(string[] args)
    {
        List<Produto> loja = new List<Produto>();

        // Adicionando alguns produtos
        loja.Add(new Produto("Camiseta", 49.90, 100));
        loja.Add(new Produto("Calça Jeans", 129.90, 50));
        loja.Add(new Produto("Tênis", 199.90, 30));

        bool continuar = true;

        while (continuar)
        {
            Console.Clear();
            Console.WriteLine("Bem-vindo à Loja!");
            Console.WriteLine("1. Cadastrar Produto");
            Console.WriteLine("2. Editar Produto");
            Console.WriteLine("3. Realizar Venda");
            Console.WriteLine("4. Exibir Produtos");
            Console.WriteLine("5. Sair");
            Console.Write("Escolha uma opção: ");
            string opcao = Console.ReadLine();

            switch (opcao)
            {
                case "1":
                    // Cadastrar produto
                    Console.Write("Digite o nome do produto: ");
                    string nomeProduto = Console.ReadLine();
                    Console.Write("Digite o preço do produto: ");
                    double precoProduto = Convert.ToDouble(Console.ReadLine());
                    Console.Write("Digite a quantidade em estoque: ");
                    int estoqueProduto = Convert.ToInt32(Console.ReadLine());

                    Produto novoProduto = new Produto(nomeProduto, precoProduto, estoqueProduto);
                    loja.Add(novoProduto);
                    Console.WriteLine($"Produto {nomeProduto} cadastrado com sucesso!");
                    break;

                case "2":
                    // Editar produto
                    Console.Write("Digite o nome do produto que deseja editar: ");
                    string nomeParaEditar = Console.ReadLine();
                    Produto produtoEditar = loja.Find(p => p.Nome.ToLower() == nomeParaEditar.ToLower());

                    if (produtoEditar != null)
                    {
                        Console.Write("Digite o novo preço: ");
                        produtoEditar.Preco = Convert.ToDouble(Console.ReadLine());
                        Console.Write("Digite a nova quantidade em estoque: ");
                        produtoEditar.Estoque = Convert.ToInt32(Console.ReadLine());
                        Console.WriteLine("Produto atualizado com sucesso!");
                    }
                    else
                    {
                        Console.WriteLine("Produto não encontrado!");
                    }
                    break;

                case "3":
                    // Realizar venda
                    Console.Write("Digite o nome do produto para venda: ");
                    string nomeVenda = Console.ReadLine();
                    Produto produtoVenda = loja.Find(p => p.Nome.ToLower() == nomeVenda.ToLower());

                    if (produtoVenda != null)
                    {
                        Console.Write("Digite a quantidade a ser vendida: ");
                        int quantidadeVenda = Convert.ToInt32(Console.ReadLine());
                        produtoVenda.Vender(quantidadeVenda);
                    }
                    else
                    {
                        Console.WriteLine("Produto não encontrado!");
                    }
                    break;

                case "4":
                    // Exibir produtos
                    Console.WriteLine("\nProdutos disponíveis na loja:");
                    foreach (var produto in loja)
                    {
                        produto.ExibirInformacoes();
                    }
                    break;

                case "5":
                    // Sair
                    continuar = false;
                    break;

                default:
                    Console.WriteLine("Opção invá1lida! Tente novamente.");
   a                 break;
  Q1          }

            Console.WriteLine("\nPressione qualquer tecla para continuar...");
            Console.ReadKey();
        }
    }
}

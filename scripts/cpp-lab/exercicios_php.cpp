Aqui está o código PHP que você pode usar para cada uma das solicitações mencionadas:

### 1. Gerar uma lista não ordenada de 1 a 100:

```php
<?php
function listaNaoOrdenada() {
    echo "<ul>";
    for ($i = 1; $i <= 100; $i++) {
        echo "<li>$i</li>";
    }
    echo "</ul>";
}
?>
```

### 2. Percorrer um array de 12 nomes e exibir em uma lista ordenada:

```php
<?php
function listaDeNomes() {
    $nomes = ["João", "Maria", "Carlos", "Ana", "Lucas", "Fernanda", "Eduardo", "Patrícia", "Marcos", "Beatriz", "Roberta", "Tiago"];
    
    echo "<ol>";
    foreach ($nomes as $nome) {
        echo "<li>$nome</li>";
    }
    echo "</ol>";
}
?>
```

### 3. Percorrer um array multidimensional com informações de automóveis e exibir título (ano) e parágrafo (modelo e marca):

```php
<?php
function listaDeCarros() {
    $carros = [
        ["marca" => "Toyota", "modelo" => "Corolla", "ano" => 2021],
        ["marca" => "Honda", "modelo" => "Civic", "ano" => 2020],
        ["marca" => "Ford", "modelo" => "Fusion", "ano" => 2019],
        ["marca" => "Chevrolet", "modelo" => "Onix", "ano" => 2022],
        ["marca" => "BMW", "modelo" => "X5", "ano" => 2023],
        ["marca" => "Audi", "modelo" => "A4", "ano" => 2021],
        ["marca" => "Volkswagen", "modelo" => "Golf", "ano" => 2018],
        ["marca" => "Hyundai", "modelo" => "HB20", "ano" => 2021],
        ["marca" => "Nissan", "modelo" => "Kicks", "ano" => 2020],
        ["marca" => "Fiat", "modelo" => "Punto", "ano" => 2017],
        ["marca" => "Mercedes", "modelo" => "C-Class", "ano" => 2022],
        ["marca" => "Renault", "modelo" => "Kwid", "ano" => 2023]
    ];

    foreach ($carros as $carro) {
        echo "<h3>{$carro['ano']}</h3>";
        echo "<p>Marca: {$carro['marca']} | Modelo: {$carro['modelo']}</p>";
    }
}
?>
```

### 4. Criar uma classe para representar uma escola e realizar cadastro (inserir, listar, excluir) em uma lista de escolas:

```php
<?php
class Escola {
    public $nome;
    public $endereco;
    public $capacidade;
    
    public function __construct($nome, $endereco, $capacidade) {
        $this->nome = $nome;
        $this->endereco = $endereco;
        $this->capacidade = $capacidade;
    }
}

class CadastroDeEscolas {
    private $escolas = [];
    
    public function inserirEscola($escola) {
        $this->escolas[] = $escola;
    }
    
    public function listarEscolas() {
        echo "<ul>";
        foreach ($this->escolas as $escola) {
            echo "<li><strong>{$escola->nome}</strong><br>Endereço: {$escola->endereco}<br>Capacidade: {$escola->capacidade}</li>";
        }
        echo "</ul>";
    }
    
    public function excluirEscola($nome) {
        foreach ($this->escolas as $key => $escola) {
            if ($escola->nome == $nome) {
                unset($this->escolas[$key]);
                echo "<p>Escola {$nome} excluída com sucesso!</p>";
                return;
            }
        }
        echo "<p>Escola não encontrada.</p>";
    }
}

// Exemplo de uso
$cadastro = new CadastroDeEscolas();

$escola1 = new Escola("Escola A", "Rua X, 123", 500);
$escola2 = new Escola("Escola B", "Rua Y, 456", 300);
$escola3 = new Escola("Escola C", "Rua Z, 789", 700);

$cadastro->inserirEscola($escola1);
$cadastro->inserirEscola($escola2);
$cadastro->inserirEscola($escola3);

$cadastro->listarEscolas();
$cadastro->excluirEscola("Escola B");
$cadastro->listarEscolas();
?>
```

### 5. Criando o menu no `index.php`:

Aqui está um exemplo de como criar o menu no `index.php` que chama as funções acima:

```php
<?php
include_once 'funcoes.php'; // Inclua o arquivo onde estão suas funções

// Verifica qual função foi chamada
if (isset($_GET['acao'])) {
    $acao = $_GET['acao'];

    switch ($acao) {
        case 'listaNaoOrdenada':
            listaNaoOrdenada();
            break;
        case 'listaDeNomes':
            listaDeNomes();
            break;
        case 'listaDeCarros':
            listaDeCarros();
            break;
        case 'cadastroEscolas':
            $cadastro = new CadastroDeEscolas();
            $cadastro->inserirEscola(new Escola("Escola A", "Rua X", 300));
            $cadastro->inserirEscola(new Escola("Escola B", "Rua Y", 400));
            $cadastro->listarEscolas();
            break;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Menu de Funções</title>
</head>
<body>
    <h1>Menu de Funções</h1>
    <ul>
        <li><a href="?acao=listaNaoOrdenada">Lista de 1 a 100</a></li>
        <li><a href="?acao=listaDeNomes">Lista de Nomes</a></li>
        <li><a href="?acao=listaDeCarros">Lista de Carros</a></li>
        <li><a href="?acao=cadastroEscolas">Cadastro de Escolas</a></li>
    </ul>
</body>
</html>
```


<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";  // Ou seu usuário MySQL
$password = "";  // Ou sua senha MySQL
$dbname = "usuarios";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Buscando os dados ordenados por nome
$sql = "SELECT nome, github FROM pessoas ORDER BY nome ASC";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Pessoas</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>

<h2>Lista de Usuários</h2>

<table>
    <tr>
        <th>Nome</th>
        <th>GitHub</th>
    </tr>

    <?php
    if ($result->num_rows > 0) {
        // Exibindo os dados em uma tabela
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["nome"]. "</td><td>" . $row["github"]. "</td></tr>";
        }
    } else {
        echo "<tr><td colspan='2'>Nenhum resultado encontrado</td></tr>";
    }
    ?>

</table>

<a href="index.html">Voltar ao cadastro</a>

</body>
</html>

<?php
$conn->close();
?>

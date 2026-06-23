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

// Obtendo dados do formulário
$nome = $_POST['nome'];
$apelido = $_POST['apelido'];
$github = $_POST['github'];

// Inserindo os dados na tabela
$sql = "INSERT INTO pessoas (nome, apelido, github) VALUES ('$nome', '$apelido', '$github')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastro realizado com sucesso!";
    echo "<br><a href='lista.php'>Ver lista de usuários</a>";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

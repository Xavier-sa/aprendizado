<?php

class Database
{
    private $host = "localhost";
    private $port = "3306";
    private $username = "root";
    private $password;
    private $dbName = "xavier_solutions";  
    private $conn;  

    // Responsável por instanciar um objeto de Database
    public function __construct($host, $port, $username, $password, $dbName)
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->dbName = $dbName;
    }

    // Responsável por criar a conexão com o DB
    public function createConnection()
    {
        try {
            // Usa o host correto
            $connUrl = "mysql:host={$this->host};port={$this->port};dbname={$this->dbName};charset=utf8mb4";  // Corrigido para incluir a porta
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ];

            // Criação da conexão
            $this->conn = new PDO($connUrl, $this->username, $this->password, $options);  // Incluindo opções para a conexão
            return $this->conn;
        } catch (PDOException $e) {
            echo "Erro na conexão: " . $e->getMessage();  // Exibe o erro completo
            return null;
        }
    }

    // Método para obter a conexão (caso precise acessar a conexão de outras partes do código)
    public function getConnection()
    {
        return $this->conn;
    }
}

?>


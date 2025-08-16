<?php
class Database
{
    private static $pdo;

    public static function conectar()
    {
        if (!self::$pdo) {
            $host = 'localhost';
            $dbname = 'teste_paginacao';
            $user = 'root';
            $pass = '';

            try {
                self::$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Erro na conexão: " . $e->getMessage());
            }
        }

        return self::$pdo;
    }
}

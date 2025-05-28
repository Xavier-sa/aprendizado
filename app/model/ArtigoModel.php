<?php
class ArtigoModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function criarArtigo($titulo, $conteudo, $categoria_id, $usuario_id) {
        try {
            $sql = "INSERT INTO artigos (titulo, conteudo, categoria_id, usuario_id) 
                    VALUES (:titulo, :conteudo, :categoria_id, :usuario_id)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':titulo', $titulo, PDO::PARAM_STR);
            $stmt->bindParam(':conteudo', $conteudo, PDO::PARAM_STR);
            $stmt->bindParam(':categoria_id', $categoria_id, PDO::PARAM_INT);  
            $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT); 
            $stmt->execute();
    
            return true;  // Sucesso
        } catch (PDOException $e) {
            error_log("Erro ao criar artigo: " . $e->getMessage());
            return false;
        }
    }
    

    public function listarArtigos() {
        try {
            $sql = "SELECT * FROM artigos";
            return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erro ao listar artigos: " . $e->getMessage());
            return [];
        }
    }

    public function excluirArtigo($id) {
        try {
            $stmt = $this->pdo->prepare("DELETE FROM artigos WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log("Erro ao excluir artigo: " . $e->getMessage());
            return false;
        }
    }

    public function obterArtigoPorId($id) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM artigos WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Log do erro ou tratamento adequado
            error_log("Erro ao obter artigo: " . $e->getMessage());
            return false;
        }
    }
}
?>
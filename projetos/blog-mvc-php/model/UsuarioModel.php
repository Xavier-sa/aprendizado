<?php
class UsuarioModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Método para criar um novo usuário
    public function criarUsuario($dados) {
        $sql = "INSERT INTO usuarios 
                (nome, email, telefone, data_nascimento, cpf) 
                VALUES 
                (:nome, :email, :telefone, :data_nascimento, :cpf)";
        
        $stmt = $this->pdo->prepare($sql);
        
        // Hash da senha antes de armazenar
        // $senhaHash = password_hash($dados['senha'], PASSWORD_DEFAULT);
        
        $stmt->bindParam(':nome', $dados['nome']);
        $stmt->bindParam(':email', $dados['email']);
        $stmt->bindParam(':telefone', $dados['telefone']);
        $stmt->bindParam(':data_nascimento', $dados['data_nascimento']);
        $stmt->bindParam(':cpf', $dados['cpf']);
        // $stmt->bindParam(':senha', $senhaHash);
        
        return $stmt->execute();
    }

    // Método para listar todos os usuários
    public function listarUsuarios() {
        $sql = "SELECT id, nome, email, telefone, data_nascimento, cpf FROM usuarios ORDER BY nome";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para obter um usuário por ID
    public function obterUsuarioPorId($id) {
        $sql = "SELECT * FROM usuarios WHERE id = :id"; 
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Método para atualizar um usuário
    public function atualizarUsuario($id, $dados) {
        $sql = "UPDATE usuarios SET 
                nome = :nome,
                email = :email,
                telefone = :telefone,
                data_nascimento = :data_nascimento,
                cpf = :cpf
                WHERE id = :id";
        
        $stmt = $this->pdo->prepare($sql);
        
        $stmt->bindParam(':nome', $dados['nome']);
        $stmt->bindParam(':email', $dados['email']);
        $stmt->bindParam(':telefone', $dados['telefone']);
        $stmt->bindParam(':data_nascimento', $dados['data_nascimento']);
        $stmt->bindParam(':cpf', $dados['cpf']);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        
        return $stmt->execute();
    }

    private function excluirArtigos($id) {
        $sql = "DELETE FROM artigos WHERE usuario_id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // Método para excluir um usuário
    public function excluirUsuario($id) {
        // Excluindo primeiro os artigos relacionados ao usuário
        $this->excluirArtigos($id);

        // Agora, exclui o usuário
        $sql = "DELETE FROM usuarios WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // irei criar futuramente
    public function verificarLogin($email) {
         
        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        
        // Verifica se o usuário foi encontrado
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Se o usuário for encontrado, retorna os dados do usuário
        if ($usuario) {
            return $usuario;
        }
        
        // Se o usuário não for encontrado, retorna false
        return false;
    }
    

    // adicionando os dados do professor 
    public function popularDadosIniciais() {
        // Verifica se já existem usuários cadastrados
        $sql = "SELECT COUNT(*) as total FROM usuarios";
        $stmt = $this->pdo->query($sql);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($resultado['total'] == 0) {
            $usuarios = [
                [
                    
                    'nome' => 'João Silva',
                    'email' => 'joao.silva@email.com',
                    'telefone' => '(11) 99999-0001',
                    'data_nascimento' => '1990-01-15',
                    'cpf' => '123.456.789-01'
                ],
                [
                    
                    'nome' => 'Maria Oliveira',
                    'email' => 'maria.oliveira@email.com',
                    'telefone' => '(11) 99999-0002',
                    'data_nascimento' => '1985-02-20',
                    'cpf' => '123.456.789-02'
                ],
                [
                    
                    'nome' => 'Carlos Souza',
                    'email' => 'carlos.souza@email.com',
                    'telefone' => '(11) 99999-0003',
                    'data_nascimento' => '1992-03-25',
                    'cpf' => '123.456.789-03'
                ],
                [
                    
                    'nome' => 'Ana Lima',
                    'email' => 'ana.lima@email.com',
                    'telefone' => '(11) 99999-0004',
                    'data_nascimento' => '1995-04-10',
                    'cpf' => '123.456.789-04'
                ],
                [
                    
                    'nome' => 'Pedro Santos',
                    'email' => 'pedro.santos@email.com',
                    'telefone' => '(11) 99999-0005',
                    'data_nascimento' => '1988-05-30',
                    'cpf' => '123.456.789-05'
                ],
                [
                    
                    'nome' => 'Juliana Costa',
                    'email' => 'juliana.costa@email.com',
                    'telefone' => '(11) 99999-0006',
                    'data_nascimento' => '1991-06-12',
                    'cpf' => '123.456.789-06'
                ],
                [
                    
                    'nome' => 'Lucas Almeida',
                    'email' => 'lucas.almeida@email.com',
                    'telefone' => '(11) 99999-0007',
                    'data_nascimento' => '1994-07-05',
                    'cpf' => '123.456.789-07'
                ],
                [
                    
                    'nome' => 'Fernanda Rocha',
                    'email' => 'fernanda.rocha@email.com',
                    'telefone' => '(11) 99999-0008',
                    'data_nascimento' => '1990-08-21',
                    'cpf' => '123.456.789-08'
                ],
                [
                    
                    'nome' => 'Ricardo Mendes',
                    'email' => 'ricardo.mendes@email.com',
                    'telefone' => '(11) 99999-0009',
                    'data_nascimento' => '1987-09-09',
                    'cpf' => '123.456.789-09'
                ],
                [
                     
                    'nome' => 'Camila Nogueira',
                    'email' => 'camila.nogueira@email.com',
                    'telefone' => '(11) 99999-0010',
                    'data_nascimento' => '1993-10-14',
                    'cpf' => '123.456.789-10'
                ],
                [
                     
                    'nome' => 'Eduardo Ramos',
                    'email' => 'eduardo.ramos@email.com',
                    'telefone' => '(11) 99999-0011',
                    'data_nascimento' => '1989-11-17',
                    'cpf' => '123.456.789-11'
                ],
                [
                     
                    'nome' => 'Bianca Ferreira',
                    'email' => 'bianca.ferreira@email.com',
                    'telefone' => '(11) 99999-0012',
                    'data_nascimento' => '1996-12-22',
                    'cpf' => '123.456.789-12'
                ],
                [
                     
                    'nome' => 'Gustavo Teixeira',
                    'email' => 'gustavo.teixeira@email.com',
                    'telefone' => '(11) 99999-0013',
                    'data_nascimento' => '1986-01-08',
                    'cpf' => '123.456.789-13'
                ],
                [
                     
                    'nome' => 'Larissa Carvalho',
                    'email' => 'larissa.carvalho@email.com',
                    'telefone' => '(11) 99999-0014',
                    'data_nascimento' => '1997-02-26',
                    'cpf' => '123.456.789-14'
                ],
                [
                     
                    'nome' => 'Marcos Antunes',
                    'email' => 'marcos.antunes@email.com',
                    'telefone' => '(11) 99999-0015',
                    'data_nascimento' => '1984-03-18',
                    'cpf' => '123.456.789-15'
                ]
            ];
            
            
            foreach ($usuarios as $usuario) {
                $this->criarUsuario($usuario);
            }
            
            return count($usuarios) . " usuários cadastrados com sucesso!";
        }
        
        return "O banco já contém dados de usuários.";
    }
}
?>
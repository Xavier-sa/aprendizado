// =============================
// Classe Endereco (Agregação)
// =============================
class Endereco {
    private String pais;
    private String estado;
    private String rua;
    private int numero;
    private String cep;
    private String complemento;

    public Endereco(String pais, String estado, String rua, int numero, String cep, String complemento) {
        this.pais = pais;
        this.estado = estado;
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.complemento = complemento;
    }

    public void imprimirEndereco() {
        System.out.println("Endereço: " + rua + ", " + numero + " - " + complemento);
        System.out.println("CEP: " + cep + " | " + estado + " - " + pais);
    }
}

// =============================
// Superclasse Pessoa
// =============================
class Pessoa {
    protected String nome;
    protected int diaNascimento;
    protected int mesNascimento;
    protected int anoNascimento;
    protected String cpf;
    protected Endereco endereco;
    protected int idade;

    public Pessoa(String nome, int dia, int mes, int ano, String cpf, Endereco endereco) {
        this.nome = nome;
        this.diaNascimento = dia;
        this.mesNascimento = mes;
        this.anoNascimento = ano;
        this.cpf = cpf;
        this.endereco = endereco;
        this.idade = calcularIdade();
    }

    private int calcularIdade() {
        int anoAtual = 2025; // exemplo
        return anoAtual - this.anoNascimento;
    }

    protected void atualizarIdade() {
        this.idade = calcularIdade();
    }

    public void imprimirDados() {
        System.out.println("Nome: " + nome);
        System.out.println("CPF: " + cpf);
        System.out.println("Idade: " + idade);
        if (endereco != null) {
            endereco.imprimirEndereco();
        }
    }
}

// =============================
// Subclasse Aluno
// =============================
class Aluno extends Pessoa {
    private int matricula;
    private String curso;

    public Aluno(String nome, int dia, int mes, int ano, String cpf, Endereco endereco, int matricula, String curso) {
        super(nome, dia, mes, ano, cpf, endereco);
        this.matricula = matricula;
        this.curso = curso;
    }

    public void imprimirDadosAluno() {
        atualizarIdade();
        System.out.println("=== Dados do Aluno ===");
        super.imprimirDados();
        System.out.println("Matrícula: " + matricula);
        System.out.println("Curso: " + curso);
    }
}

// =============================
// Subclasse Empregado
// =============================
class Empregado extends Pessoa {
    private int matricula;
    private String dataAdmissao;

    public Empregado(String nome, int dia, int mes, int ano, String cpf, Endereco endereco, int matricula, String dataAdmissao) {
        super(nome, dia, mes, ano, cpf, endereco);
        this.matricula = matricula;
        this.dataAdmissao = dataAdmissao;
    }

    public void imprimirDadosEmpregado() {
        atualizarIdade();
        System.out.println("=== Dados do Empregado ===");
        super.imprimirDados();
        System.out.println("Matrícula: " + matricula);
        System.out.println("Data de Admissão: " + dataAdmissao);
    }
}

// =============================
// Classe Principal
// =============================
public class Principal {
    public static void main(String[] args) {

        // Criação de um endereço para Maria
        Endereco enderecoMaria = new Endereco(
            "Brasil",
            "Ceará",
            "Rua Canuto de Aguiar",
            176,
            "20252-060",
            "Apto 307"
        );

        // Criação do novo aluno "Maria"
        Aluno maria = new Aluno(
            "Maria",
            7, // dia
            7, // mês (julho)
            2007, // ano
            "123456877-00", // CPF
            enderecoMaria,
            1001, // matrícula
            "Ensino Médio"
        );

        // Impressão dos dados de Maria
        maria.imprimirDadosAluno();

        System.out.println("\nFim da Execução!");
    }
}

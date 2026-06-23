import java.util.Random;

public class Aluno {
    // Atributos
    private String nome;
    private int idade;
    private double codigo_identificador;
    private Random aleatorio;

    // Construtor
    public Aluno(String nome, int idade) {
        aleatorio = new Random();
        this.nome = nome;
        this.idade = idade;
        this.codigo_identificador = aleatorio.nextDouble(); // pode ser substituído por algo melhor
    }

    // Métodos "set"
    public void definirNome(String nome) {
        this.nome = nome;
    }

    public void definirIdade(int idade) {
        this.idade = idade;
    }

    // Métodos "get"
    public String obterNome() {
        return this.nome;
    }

    public int obterIdade() {
        return this.idade;
    }

    public double obterCodigoIdentificador() {
        return this.codigo_identificador;
    }

    // Método para exibir os dados
    public void exibirDados() {
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("Código identificador: " + codigo_identificador);
    }

    // Método principal (para teste)
    public static void main(String[] args) {
        Aluno a1 = new Aluno("João", 20);
        a1.exibirDados();
    }
}

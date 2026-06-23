
## 🧩 Código completo da atividade — *Herança e Polimorfismo*

### 📁 Arquivo: `Principal.java`

```java
// =============================
// Superclasse
// =============================
class Pessoa {
    // Atributos protegidos (visíveis para subclasses)
    protected String nome;
    protected int diaNascimento;
    protected int mesNascimento;
    protected int anoNascimento;
    protected int idade;

    // Construtor
    public Pessoa(String nome, int dia, int mes, int ano) {
        this.nome = nome;
        this.diaNascimento = dia;
        this.mesNascimento = mes;
        this.anoNascimento = ano;
        this.idade = calcularIdade();
    }

    // Método privado — só pode ser acessado dentro da própria classe
    private int calcularIdade() {
        int anoAtual = 2025; // valor fixo apenas para o exemplo
        return anoAtual - this.anoNascimento;
    }

    // Método protegido — pode ser usado pelas subclasses
    protected void atualizarIdade() {
        this.idade = calcularIdade();
    }

    // Método público
    public void imprimirDados() {
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
    }
}

// =============================
// Subclasse Aluno
// =============================
class Aluno extends Pessoa {
    private String curso;
    private int matricula;

    // Construtor usa 'super' para chamar o construtor da superclasse
    public Aluno(String nome, int dia, int mes, int ano, int matricula, String curso) {
        super(nome, dia, mes, ano);
        this.matricula = matricula;
        this.curso = curso;
    }

    // Método específico de Aluno
    public void imprimirDadosAluno() {
        atualizarIdade(); // chamada do método protegido da superclasse
        System.out.println("=== Dados do Aluno ===");
        super.imprimirDados(); // imprime nome e idade
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

    public Empregado(String nome, int dia, int mes, int ano, int matricula, String dataAdmissao) {
        super(nome, dia, mes, ano);
        this.matricula = matricula;
        this.dataAdmissao = dataAdmissao;
    }

    public void imprimirDadosEmpregado() {
        atualizarIdade(); // acesso ao método protegido
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

        // Cria um objeto da subclasse Aluno
        Aluno aluno = new Aluno("Maria", 10, 5, 2002, 12345, "Ciência da Computação");
        aluno.imprimirDadosAluno();

        System.out.println();

        // Cria um objeto da subclasse Empregado
        Empregado emp = new Empregado("João", 22, 3, 1988, 9876, "15/02/2015");
        emp.imprimirDadosEmpregado();

        System.out.println("\nFim da execução!");
    }
}
```

---

## 🧠 O que esse código demonstra

| Conceito                    | Onde aparece                                               |
| --------------------------- | ---------------------------------------------------------- |
| **Herança**                 | `Aluno extends Pessoa` e `Empregado extends Pessoa`        |
| **Encapsulamento**          | Atributos privados e protegidos                            |
| **Uso de `super`**          | Chamadas ao construtor da superclasse e a métodos herdados |
| **Modificadores de acesso** | `private`, `protected`, `public`                           |
| **Polimorfismo simples**    | Subclasses especializam o comportamento de `Pessoa`        |

---

## ▶️ Saída esperada

```
=== Dados do Aluno ===
Nome: Maria
Idade: 23
Matrícula: 12345
Curso: Ciência da Computação

=== Dados do Empregado ===
Nome: João
Idade: 37
Matrícula: 9876
Data de Admissão: 15/02/2015

Fim da execução!
```

---

## 💬 Explicação (nível júnior)

1. **Pessoa** é a classe **genérica** — ela define os atributos comuns (nome, idade, nascimento) e calcula a idade.
2. **Aluno** e **Empregado** são **subclasses** — elas herdam os atributos e métodos da superclasse e adicionam informações próprias.
3. A palavra-chave **`super`** é usada para:

   * Chamar o construtor da superclasse (`super(nome, dia, mes, ano)`).
   * Chamar métodos herdados (`super.imprimirDados()`).
4. O método **`atualizarIdade()`** é `protected`, ou seja, **visível dentro da classe e suas subclasses**.
5. O **polimorfismo** aparece porque tanto `Aluno` quanto `Empregado` podem “imprimir dados” de formas diferentes, mas compartilham a mesma base (`Pessoa`).

---

## ⚙️ Como salvar e executar

📌 Salve o código em um arquivo chamado **`Principal.java`**
E execute com:

```bash
javac Principal.java
java Principal
```

---


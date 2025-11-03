# 🧩 Programação Orientada a Objetos em Java  
## Classes, Objetos e Tipos de Relações entre Objetos

---

### 📘 1. Conceito de Relações entre Objetos

Na **Programação Orientada a Objetos (POO)**, os objetos raramente funcionam de forma isolada.  
Eles **se relacionam** para compor sistemas mais complexos, trocando informações e colaborando entre si.

Essas relações podem assumir **diferentes níveis de dependência**, desde as mais fracas (associação) até as mais fortes (composição).

---

### 🔗 2. Tipos de Relações entre Objetos

#### 🟦 Associação
É a **relação mais fraca** entre objetos.

- Representa o **uso ou dependência funcional** entre classes.  
- Cada objeto tem **existência independente** do outro.  
- Pode ocorrer com diferentes **cardinalidades**:  
  - *um para um*  
  - *um para vários*  
  - *vários para vários*

📘 **Exemplo:**  
Um **Professor** pode estar associado a uma **Escola**, mas ambos existem separadamente.

```java
class Professor {
    private String nome;

    public Professor(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}

class Escola {
    private String nome;

    public Escola(String nome) {
        this.nome = nome;
    }

    public void associarProfessor(Professor professor) {
        System.out.println(professor.getNome() + " está associado à escola " + nome);
    }
}

public class Main {
    public static void main(String[] args) {
        Professor p1 = new Professor("Carlos");
        Escola e1 = new Escola("Escola Modelo");
        e1.associarProfessor(p1);
    }
}
````

📍 Aqui, se o objeto `Escola` deixar de existir, o objeto `Professor` **ainda existe**.
Essa é uma **relação de associação**.

---

#### 🟨 Agregação

É uma **relação “tem-um” mais forte**, mas ainda com **independência** entre os objetos.

* Representa uma **relação de todo–parte**, onde uma classe contém objetos de outra.
* Os objetos agregados **podem existir separadamente**.
* Quando o objeto principal é destruído, os agregados **continuam existindo**.

📘 **Exemplo:**
Uma **Escola** tem **Alunos**, mas os alunos **existem mesmo sem a escola**.

```java
import java.util.List;
import java.util.ArrayList;

class Aluno {
    private String nome;

    public Aluno(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
}

class Escola {
    private String nome;
    private List<Aluno> alunos; // agregação

    public Escola(String nome) {
        this.nome = nome;
        this.alunos = new ArrayList<>();
    }

    public void adicionarAluno(Aluno aluno) {
        alunos.add(aluno);
    }

    public void listarAlunos() {
        System.out.println("Alunos da escola " + nome + ":");
        for (Aluno a : alunos) {
            System.out.println("- " + a.getNome());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Aluno a1 = new Aluno("Maria");
        Aluno a2 = new Aluno("João");

        Escola escola = new Escola("Escola Central");
        escola.adicionarAluno(a1);
        escola.adicionarAluno(a2);

        escola.listarAlunos();
    }
}
```

📍 Se a `Escola` for destruída, os objetos `Aluno` **continuam existindo**.
Essa é uma **relação de agregação**.

---

#### 🟥 Composição

É a **relação mais forte** entre objetos.

* Também é uma **relação de todo–parte**, mas com **dependência total**.
* Quando o objeto “todo” é destruído, as partes **também são destruídas**.
* O ciclo de vida das partes depende inteiramente do objeto principal.

📘 **Exemplo:**
Uma **Escola** tem **Departamentos**, e se a escola for excluída, os departamentos deixam de existir.

```java
import java.util.List;
import java.util.ArrayList;

class Departamento {
    private String nome;

    public Departamento(String nome) {
        this.nome = nome;
    }

    public void exibir() {
        System.out.println("Departamento: " + nome);
    }
}

class Escola {
    private String nome;
    private List<Departamento> departamentos; // composição

    public Escola(String nome) {
        this.nome = nome;
        this.departamentos = new ArrayList<>();
    }

    public void adicionarDepartamento(String nomeDepto) {
        departamentos.add(new Departamento(nomeDepto)); // criado dentro da escola
    }

    public void exibirDepartamentos() {
        System.out.println("Departamentos da escola " + nome + ":");
        for (Departamento d : departamentos) {
            d.exibir();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Escola escola = new Escola("Instituto Alfa");
        escola.adicionarDepartamento("Matemática");
        escola.adicionarDepartamento("Ciências");

        escola.exibirDepartamentos();
    }
}
```

📍 Quando o objeto `Escola` é destruído, os objetos `Departamento` também são.
Essa é uma **relação de composição**.

---

### ⚖️ 3. Comparativo entre os Tipos de Relação

| Tipo de Relação | Dependência entre Objetos | Existência Independente | Exemplo               |
| --------------- | ------------------------- | ----------------------- | --------------------- |
| **Associação**  | Fraca                     | ✅ Sim                   | Professor ↔ Escola    |
| **Agregação**   | Moderada (“tem-um”)       | ✅ Sim                   | Escola → Aluno        |
| **Composição**  | Forte (“é-dono-de”)       | ❌ Não                   | Escola → Departamento |

---

### 🧠 4. Conclusão

Os **tipos de relações entre objetos** representam **como as classes colaboram** dentro de um sistema:

* 🔹 **Associação**: uso ou referência entre objetos.
* 🔸 **Agregação**: uma classe **contém** outras, mas de forma **independente**.
* 🔴 **Composição**: uma classe **possui e gerencia** completamente outras.

Compreender essas diferenças é essencial para projetar sistemas bem estruturados, com **boas práticas de encapsulamento, modularidade e reuso de código.**

---

### 🏁 Resultado Esperado da Execução (exemplo final)

```
Departamentos da escola Instituto Alfa:
Departamento: Matemática
Departamento: Ciências
```

---

### 📚 Referências

* Curso: *Introdução à Programação OO em Java*
* Conceitos: *Associação, Agregação e Composição*
* Linguagem: *Java (OpenJDK 13+)*


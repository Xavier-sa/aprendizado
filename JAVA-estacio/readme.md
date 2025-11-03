````markdown
# 🧩 Programação Orientada a Objetos em Java  
## Classes, Objetos e Encapsulamento

### 📘 1. Conceito de Classe e Objeto

Em **Programação Orientada a Objetos (POO)**, uma **classe** é um modelo (ou molde) que define as características e comportamentos de um tipo de objeto.  
Um **objeto** é uma instância dessa classe — ou seja, algo concreto criado a partir dela.

Exemplo simples:

```java
class Aluno {
    String nome;
    int idade;

    void exibirInformacoes() {
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
    }
}

public class Main {
    public static void main(String[] args) {
        Aluno a1 = new Aluno();
        a1.nome = "João";
        a1.idade = 20;
        a1.exibirInformacoes();
    }
}
````

---

### 🔒 2. Encapsulamento de Código

O **encapsulamento** é um dos pilares da POO.
Ele visa **ocultar os detalhes internos de uma classe** e **expor apenas o necessário** para que outras partes do sistema possam interagir com ela de forma controlada.

Em outras palavras:

> O encapsulamento protege os dados internos de um objeto contra acessos indevidos e manipulações incorretas.

Isso é feito através dos **modificadores de visibilidade**:

| Modificador | Descrição                                            |
| ----------- | ---------------------------------------------------- |
| `private`   | Acesso permitido **apenas dentro da própria classe** |
| `protected` | Acesso permitido dentro da classe e por subclasses   |
| `public`    | Acesso permitido de qualquer lugar                   |

---

### ⚙️ 3. Importância do Encapsulamento

O encapsulamento traz **dois grandes benefícios**:

1. **Proteção dos dados internos**

   * Os atributos são declarados como `private`.
   * O acesso a eles é feito apenas por métodos controlados (getters e setters).

2. **Abstração e simplicidade**

   * O usuário da classe não precisa conhecer sua implementação interna.
   * Ele apenas utiliza os métodos públicos (a interface da classe).

Isso garante **integridade, segurança e modularidade** no código.

---

### 💻 4. Exemplo Prático em Java

```java
public class Pessoa {
    // Atributos privados (encapsulados)
    private String nome;
    private double codigoIdentificador;

    // Construtor
    public Pessoa(String nome) {
        this.nome = nome;
        this.codigoIdentificador = Math.random(); // gera um código único aleatório
    }

    // Getter público (permite leitura do nome)
    public String getNome() {
        return nome;
    }

    // Setter privado (somente a classe pode alterar o nome)
    private void setNome(String nome) {
        this.nome = nome;
    }

    // Getter público (permite leitura do código)
    public double getCodigoIdentificador() {
        return codigoIdentificador;
    }
}

public class Main {
    public static void main(String[] args) {
        Pessoa p1 = new Pessoa("Teste A");
        System.out.println("Pessoa 1: " + p1.getNome());
        System.out.println("Código: " + p1.getCodigoIdentificador());
    }
}
```

---

### 🧠 5. O que observar no código

1. O método `setNome` é **private** — somente a própria classe pode alterar o valor de `nome`.
2. Os métodos `getNome` e `getCodigoIdentificador` são **public** — podem ser acessados por qualquer código que instancie a classe.
3. O encapsulamento **protege os dados** e **garante comportamento previsível**.

---

### ✅ 6. Conclusão

O **encapsulamento** é fundamental para manter um código **organizado, seguro e modular**.
Ele define **contratos claros** entre as classes e o restante do sistema, permitindo que cada parte funcione como uma “caixa-preta”, com uma interface bem definida.

> 🔹 Use `private` para proteger os dados.
> 🔹 Use `public` para expor apenas o necessário.
> 🔹 Use **getters** e **setters** para controlar o acesso.

---

### 🏁 Resultado Esperado da Execução

```
Pessoa 1: Teste A
Código: 0.123456789 (valor aleatório)
```

---

### 📚 Referências

* Curso: *Introdução à Programação OO em Java*
* Conceitos: *Encapsulamento, Classes, Objetos e Visibilidade*

```

---



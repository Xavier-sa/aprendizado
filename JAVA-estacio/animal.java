// Classe Abstrata
abstract class Animal {
    // Método abstrato
    public abstract void emitirSom();

    // Método concreto
    public void dormir() {
        System.out.println("Zzzz...");
    }
}

// Subclasse concreta Cachorro
class Cachorro extends Animal {
    @Override
    public void emitirSom() {
        System.out.println("Latir!");
    }
}

// Subclasse concreta Gato
class Gato extends Animal {
    @Override
    public void emitirSom() {
        System.out.println("Miar!");
    }
}

// Subclasse concreta Leao
class Leao extends Animal {
    @Override
    public void emitirSom() {
        System.out.println("Rugir!");
    }

    // Novo método específico da classe Leao
    public void tipoDeAnimal() {
        System.out.println("É um animal selvagem");
    }
}

// Classe Main
public class Main {
    public static void main(String[] args) {
        Animal cachorro = new Cachorro();
        Animal gato = new Gato();
        Leao leao = new Leao();  // Criamos um leão

        // Testando Cachorro
        cachorro.emitirSom();
        cachorro.dormir();    

        // Testando Gato
        gato.emitirSom();  
        gato.dormir();      

        // Testando Leão
        leao.emitirSom();
        leao.dormir();
        leao.tipoDeAnimal();  // Método específico do leão
    }
}

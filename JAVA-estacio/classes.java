// Classe Abstrata
abstract class Animal {
    // metodo abstrato
    public abstract void emitirSom();

    // metodo concreto
    public void dormir() {
        System.out.println("Zzzz...");
    }
}

// subclasse concreta
class Cachorro extends Animal {
    public void emitirSom() {
        System.out.println("Latir!");
    }
}

// subclasse concreta
class Gato extends Animal {
    public void emitirSom() {
        System.out.println("Miar!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal cachorro = new Cachorro();
        Animal gato = new Gato();

        cachorro.emitirSom();
        cachorro.dormir();    

        gato.emitirSom();  
        gato.dormir();      
    }
}
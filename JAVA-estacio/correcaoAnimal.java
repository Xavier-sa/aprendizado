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
// subclasse concreta
class Leao extends Animal {
    public void tipoDeAnimal() {
        System.out.println("É um animal Selvagem.");
    }
    public void emitirSom() {
        System.out.println("Rugir!");
    }
}
// Classe Principal
public class Main {
    public static void main(String[] args) {
        Animal cachorro = new Cachorro();
        Animal gato = new Gato();
        Leao leao = new Leao();
        // cachorro
        cachorro.emitirSom();
        cachorro.dormir();    
        // gato
        gato.emitirSom();  
        gato.dormir();      
        // leao
        leao.emitirSom();  
        leao.tipoDeAnimal();
        leao.dormir();      
    }
}
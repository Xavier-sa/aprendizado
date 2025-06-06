#include <iostream>
#include <string>
using namespace std;
class Pet {
protected:
	string Name;
public:
	Pet(string n) { Name = n; }
	void Run(void) { cout << Name << ": I'm running" << endl; }
};
class Dog : public Pet {
public:
	Dog(string n) : Pet(n) {};
	void MakeSound(void) { cout << Name << ": Woof! Woof!" << endl; }
};
class Cat : public Pet {
public:
	Cat(string n) : Pet(n) {};
	void MakeSound(void) { cout << Name << ": Meow! Meow!" << endl; }
};
int main(void) {
	Pet *a_pet1 = new Cat("Tom");
	Pet *a_pet2 = new Dog("Spike");

	a_pet1 -> Run(); 
	// 'a_pet1 -> MakeSound();' is not allowed here!
	a_pet2 -> Run();
	// 'a_pet2 -> MakeSound();' is not allowed here!

	return 0;
}
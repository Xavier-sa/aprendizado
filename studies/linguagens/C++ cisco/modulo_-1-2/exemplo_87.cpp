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
class Cat : public Pet {
public:
	Cat(string n) : Pet(n) {};
	void MakeSound(void) { cout << Name << ": Meow! Meow!" << endl; }
};
class Persian : public Cat {
public:
	Persian(string n) : Cat(n) {};
};
int main(void) {
	Pet 	*a_pet;
	Persian *a_persian;
	a_pet = a_persian = new Persian("Mr. Bigglesworth");
	a_persian -> MakeSound();
	static_cast<Persian *>(a_pet) -> MakeSound();
	return 0;
}
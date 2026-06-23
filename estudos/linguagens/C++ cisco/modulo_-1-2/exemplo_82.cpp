#include <iostream>
using namespace std;
class Cat {
public:
	void MakeSound(void) { cout << "Meow! Meow!" << endl; }
};
class Dog {
public:
	void MakeSound(void) { cout << "Woof! Woof!" << endl; }
};	
int main(void) {
	Cat *a_cat = new Cat();
	Dog *a_dog = new Dog();
	a_cat -> MakeSound();
	a_dog -> MakeSound();
	return 0;
}
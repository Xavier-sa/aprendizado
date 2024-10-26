#include <iostream>

class Class {
public:
    int field;
    // Parameterized constructor
    Class(int n) : field(n) { }
    // Copy constructor
    Class(const Class &c) : field(0) { }
    // Default constructor
    Class(void) : field(1) { }
    // Member function to set the value of 'field'
    void set(int n) { field = n; }
    // Member function to get the value of 'field'
    int get(void) const { return field; } // Note the 'const' qualifier
};

int main() {
    // Example of a constant object
    const Class obj1(42); // Declaration of a constant object
    // Attempting to modify a constant object results in a compilation error
    // obj1.set(99); // Uncommenting this line would result in a compilation error
    // Accessing a member function that is marked as 'const' is allowed
    std::cout << "Value of constant object: " << obj1.get() << std::endl;
    // Creating a non-constant object
    Class obj2(77);
    // Modifying a non-constant object is allowed
    obj2.set(88);
    // Accessing a member function of a non-constant object
    std::cout << "Value of non-constant object: " << obj2.get() << std::endl;

    return 0;
}
#include <iostream>
#include <exception>
using namespace std;

class A {  
public:
   virtual void f(void) {}
};

class AA : public A {  
public:
   void aa(void) {};
};

int main(void) {
	A a;
	try {
		dynamic_cast<AA &>(a).aa();
	} catch (exception ex) {
		cout << "[" << ex.what() << "]" << endl;
	}
	return 0;
}
#include <iostream>
using namespace std;
class Class {
public:
	Class(void)  { cout << "Object constructed" << endl; }
	~Class(void) { cout << "Object destructed" << endl; }
	void Hello(void) { cout << "Object says: hello" << endl; }
};

float DoCalculations(void) {
	Class object;
	object.Hello();
	return 0.0;
}

int main(void) {
   DoCalculations();
   return 0;
}
#include <iostream>
using namespace std;
class Class {
public:
	string msg;
	Class(string txt) : msg(txt) {}
};
void function(void) throw (Class) {
	throw Class("object");
}
int main(void) {
    try {
	function();
    } catch(Class &exc) {
	cout << "Caught!" << endl;
    }
    return 0;
}
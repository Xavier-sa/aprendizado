#include <iostream>
using namespace std;
class Class {
public:
	string msg;
	Class(string txt) : msg(txt) {}
};
void function(int i) {
	throw Class("object");
}
int main(void) {
    try {
	function(1);
    } catch(Class &exc) {
	cout << "Caught!" << endl;
    }
    return 0;
}
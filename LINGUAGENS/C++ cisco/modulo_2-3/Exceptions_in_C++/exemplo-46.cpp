#include <iostream>
#include <exception>
using namespace std;
void unexp(void) {
	cout << "Unexpected exception arrived!" << endl;
	throw;
}
void function(void) throw(int, bad_exception) {
	throw 3.14; 
}
int main(void) {
	set_unexpected(unexp);
	try {
		function();
	} catch(double f) {
		cout << "Got double" << endl;	
	} catch(bad_exception bad) {
		cout << "It's so bad..." << endl;
	}
	cout << "Done" << endl;
	return 0;
}
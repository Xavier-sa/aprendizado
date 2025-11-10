#include <iostream>

using namespace std;

int main(void) {
	AddingStack super_stack;
	
	for(int i = 1; i < 10; i++)
		super_stack.push(i);
	cout << super_stack.getSum() << endl;
	for(int i = 1; i < 10; i++)
		super_stack.pop();
	cout << super_stack.getSum() << endl;
	return 0;
}
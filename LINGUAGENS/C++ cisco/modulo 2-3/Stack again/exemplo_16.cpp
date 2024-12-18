#include "mystack.h"
#include <iostream>

using namespace std;

int main(void) {
	try {
		Stack stk(1);
		stk.push(1);
		stk.push(2);
		cout << stk.pop() << endl;
	}
	catch(stack_bad_alloc sba) {
		cout << "No room for the stack - sorry!" << endl;
	}
	catch(stack_size_error sse) {
		cout << "Stacks of that size don't exist - sorry!" << endl;
	}
	catch(stack_overflow se) {
		cout << "Stack is too small for that many pushes - sorry!" << endl;
	}
	catch(stack_empty su) {
		cout << "Stack is empty - sorry!" << endl;
	}
	return 0;
}
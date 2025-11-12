#include "mystack_01.h"
#include <iostream>

using namespace std;

int main(void) {
	int i = 2;
	Stack stk;

	stk << 1;
	stk << 2 * i;
	stk << i;
	cout << stk.pop() << endl;
	cout << stk.pop() << endl;
	cout << stk.pop() << endl;
	return 0;
}
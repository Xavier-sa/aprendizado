#include "mystack.h"
#include <iostream>

using namespace std;

int main(void) {
	Stack stk;
	stk.push(1);
	cout << stk.pop() << endl;
	return 0;
}
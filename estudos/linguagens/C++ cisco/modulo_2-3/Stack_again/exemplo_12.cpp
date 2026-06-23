#include "mystack_06.h"
#include <iostream>

using namespace std;

int main(void) {
	int i = 2, j;
	Stack stk;
	stk << 1 << 2 * i;
	cout << stk[0] << endl << stk[-1] << endl;
	stk[0] = stk[-1] = 0;
	stk >> i >> j;
	cout << i << endl << j << endl;
	return 0;
}
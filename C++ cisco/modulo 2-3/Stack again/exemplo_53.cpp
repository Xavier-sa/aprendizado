#include "mystack_02.h"
#include <iostream>

using namespace std;

int main(void) {
    int i = 2;
    Stack stk;
    stk << 1;
    stk << 2 * i;
    stk << i;
    stk >> i; cout << i << endl;
    stk >> i; cout << i << endl;
    stk >> i; cout << i << endl;

    return 0;
}
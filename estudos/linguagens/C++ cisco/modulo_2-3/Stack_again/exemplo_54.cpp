#include "mystack_04.h"
#include <iostream>

using namespace std;

int main(void) {
    int i = 2, j;
    Stack stk;
    stk << 1 << 2 * i;
    stk >> j >> i;
    cout << j << endl << i << endl;
    return 0;
}
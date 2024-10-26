#include <iostream>

using namespace std;

int main(void) {
    Stack little_stack, another_stack, funny_stack;
    
    little_stack.push(1);
    another_stack.push(little_stack.pop() + 1);
    funny_stack.push(another_stack.pop() + 2);
    cout << funny_stack.pop() << endl;
    return 0;
}
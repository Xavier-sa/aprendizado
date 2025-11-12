class Stack {
    private:
	int *stackstore;
	int stacksize;
	int SP;
    public:
	Stack(int size = 100);
	~Stack();
	void push(int value);
	int pop(void);
};
Stack::Stack(int size) { 
	stackstore = new int[size];
	stacksize = size;
	SP = 0;
}
Stack::~Stack(void) {
	delete []stackstore;
}
void Stack::push(int value) {
	stackstore[SP++] = value;
}
int Stack::pop(void) { 
	return stackstore[--SP]; 
}

#include <iostream>
using namespace std;
int main(void) {
	Stack stk;
	stk.push(1);
	cout << stk.pop() << endl;
	return 0;
}
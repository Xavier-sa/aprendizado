#include <iostream>

using namespace std;

int main(void) {
	bool answer;
	int value;
	
	cout << "Enter a value: ";
	cin >> value;
	
	answer = ... // insert your expression here
	
	cout << (answer ? "THAT'S TRUE :)" : "THAT'S NOT TRUE :(") << endl;
	return 0;
}}
#include <iostream>
using namespace std;
const int DivideByZero = 111;
int main(void) {
	int a = 8, b = 0, c = 0;
	cin >> b;
	try {
		if (b == 0)
		{
			throw DivideByZero;
		}
		c = a / b;
	}
	catch(int ex)
	{
		if (ex==DivideByZero)
			cout << "Your input is not valid, you can't divide by zero." << endl;
	}
	
	cout << c << endl;
	return 0;
}
#include <iostream>

using namespace std;

int main(void) {
	int n;

	// 2 to the power of 0 is 1
	double pow = 1;

	cout << "n? ";
	cin >> n;
	for(int i = 0; i < n; i++) 

		// evaluate next negative power of 2
		pow /= 2.0;
	
	cout.precision(20);
	cout << pow << endl;
	return 0;
}
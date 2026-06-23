#include <iostream>

using namespace std;

int main(void) {
	int c0, i = 0;
	
	cout << "c0 = ";
	cin >> c0;
	while(c0 != 1) {

		// increment steps counter
		i++;

		if(c0 % 2 == 0)
			// if it's even, evaluate a new c0 as c0
			c0 = c0 / 2;
		else
			// otherwise, if it's odd, evaluate a new c0 as 3 ⋅ c0 + 1
			c0 = 3 * c0 + 1;
		cout << c0 << endl;
	}
	cout << "steps = " << i << endl;
	return 0;
}
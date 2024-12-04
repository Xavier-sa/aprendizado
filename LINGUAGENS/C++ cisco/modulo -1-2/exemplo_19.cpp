#include <iostream>

using namespace std;

int main(void) {

	// total of all elemenents
	double pi4 = 0.;

	// counter
	long   n;

	// divider
	double div = 1;

	cout << "Number of iterations? ";
	cin >> n;
	for(int i = 0; i < n; i++) {
		if(i % 2 == 1)
			// odd steps - subtract 1/divider
			pi4 -= (1. / div);
		else
			// even steps - add 1/divider
			pi4 += (1. / div);

		// update divider
		div += 2.;
	}
	cout.precision(20);
	cout << "Pi = " << (pi4 * 4.) << endl;
	return 0;
}
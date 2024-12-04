#include <iostream>

using namespace std;

int main(void) {
	float pi = 3.14159265359;
	float x, y;

	cout << "Enter value for x: ";
	cin >> x;

	// x2 : squared x (to simplify final expression)
	float x2 = x * x;	

	// pi2 : squared pi (as above)
	float pi2 = pi * pi;	
	
	// note: we use 0.5 instead of 1./2. - don't use 1/2 because it's equal to 0!
	y = ( x2 / (pi2 * (x2 + 0.5) )) * ( 1 + (x2 / (pi2 * (x2 - 0.5) * (x2 - 0.5) )));
	
	cout << "y = " << y << endl;
	return 0;
}
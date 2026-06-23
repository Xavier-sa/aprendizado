#include <iostream>

using namespace std;

int main(void) {

	// value being tested
	unsigned long val;
	// bits counter - initially zero
	int cnt = 0;

	cout << "value = ";
	cin >> val;

	// as long as there is at least '1' inside 'val'...
	while(val != 0) {

		// if the lowest bit of val is equal to 1...
		if((val & 1) == 1)
			// increment counter
			cnt ++;
		// shift val to right to check another bit 
		// note: already checked bit is lost
		val >>= 1;
	}
	cout << cnt << endl;
	return 0;
}
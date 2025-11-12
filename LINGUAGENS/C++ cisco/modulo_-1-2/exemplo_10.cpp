#include <iostream>

using namespace std;

int main(void) {
	int yr,mn,da;	// year, month, day
	
	cout << "year = ";
	cin >> yr;
	cout << "month = ";
	cin >> mn;
	cout << "day = ";
	cin >> da;
	
	// decrease month number by 2	
	mn -= 2;

	// if month number became less than zero...
	if(mn <= 0) {

		// increment it by 12 and decrement year by 1
		mn += 12;
		yr--;
	}

	// take month number, multiply it by 83 and divide by 32
	mn = mn * 83 / 32;

	// add day number to month
	mn += da;

	// add year number to month
	mn += yr;

	// add year/4 to month
	mn += yr / 4;

	// subtract year/100 from month
	mn -= yr / 100;

	// add year/400 to month
	mn += yr / 400;

	// find a remainder of dividing month by 7
	cout << mn % 7 << endl;
	return 0;
}
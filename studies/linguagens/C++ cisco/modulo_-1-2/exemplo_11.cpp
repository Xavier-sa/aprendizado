#include <iostream>

using namespace std;

int main(void) {
	int yr,mn,da;
	
	cout << "year = ";
	cin >> yr;

	// divide year by 19 and find the reminder - assign it to a
	int a = yr % 19;

	// divide year by 4 and find the reminder - assign it to b
	int b = yr % 4;

	// divide year by 7 and find the reminder - assign it to c
	int c = yr % 7;

	// take a, multiply it by 19, add 24, divide by 30 and find the reminder - assign it to d
	int d = (a * 19 + 24) % 30;

	// divide  (2b + 4c + 6d + 5) by 7 and find the reminder - assign it to e
	int e = (2 * b + 4 * c + 6 * d + 5) % 7;

	// check the value of d + e; if it is less than 10...
	if(d + e < 10)

		// the Easter falls on (d + e + 22)th day of March
		cout << "March " << d + e + 22 << endl;
	else
		// otherwise it falls on (d + e – 9)th day of April
		cout << "April " << d + e - 9 << endl;
	return 0;
}
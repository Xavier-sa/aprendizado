#include <iostream>

using namespace std;

int main(void) {

	// value to be tested
	unsigned short int val;

	bool ispalindrome = false;

	cout << "value = ";
	cin >> val;

	// we will store mirrored value of val here
	unsigned short int newval = 0;

	for(int i = 0; i < 16; i++){
		// get the bit at i-th position 
		// (counting from 0 and beginning at lowest bit position)
		// note: we use & to extract the bit
		int bit = val & (1 << i);

		// if the bit is set to '1'...
		if(bit)
			// ... put '1' at (15-i)-th position of newval
			// note: we use | to introduce the bit
			newval |= (1 << (15-i));
	}

	// val is a palindrome if it is equal to newval
	ispalindrome = newval == val;

	if(ispalindrome)
		cout << val << " is a bitwise palindrome" << endl;
	else
		cout << val << " is not a bitwise palindrome" << endl;	
	return 0;
}
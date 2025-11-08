#include <iostream>

using namespace std;

// The key to solve the problem is finding a rule (the simplest one!)
// binding number in the bottom-right corner (x) with square side (n). 
// Note that the number in the top-left corner is always equal to n*n.
// To move down from top-left to bottom-left corner we will need to skip
// n-1 cells; next, to move right to bottom-right corner we have to skip n-1
// cells again. It means, that number in the bottom-right corner is equal to:
// x = n * n - 2 * (n - 1)
// or 
// x = n * n - 2 * n + 2
// No other evaluations are needed!

int main(void) {

	unsigned long n;

	cout << "n = ";
	cin >> n;
	cout << (n * n - 2 * n + 2) << endl;
	return 0;
}
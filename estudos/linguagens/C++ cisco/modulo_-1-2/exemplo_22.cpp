#include <iostream>

using namespace std;

int main(void) {
	int side;

	cout << "Side size = ";
	cin >> side;

	// top side
	cout << '+';
	for(int i = 0; i < side-2; i++)
		cout << '-';
	cout << '+' << endl;


	for(int i = 0; i < side-2; i++) {

		// left side
		cout << '|';

		// interior
		for(int j = 0; j < side-2; j++)
			cout << ' ';

		// right side
		cout << '|' << endl;
	}

	// bottom side
	cout << '+';
	for(int i = 0; i < side-2; i++)
		cout << '-';
	cout << '+' << endl;
	
	return 0;
}
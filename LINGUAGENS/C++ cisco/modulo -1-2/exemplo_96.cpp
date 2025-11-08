#include <iostream>

using namespace std;

int main(void) {

	int money;

	// all known banknotes ordered from the most valuable to the least
	int banknotes[] = {50, 20, 10, 5, 1};

	cout << "money = ";
	cin >> money;
	for(int i = 0; i < 5; i++)
		// as long as we have more money than particular banknote...
		while(money >= banknotes[i]) {
			// ... we should add the banknote to the pool...
			cout << banknotes[i] << ' ';
			// ... and decrement the amount of our money
			money -= banknotes[i];
		}
	cout << endl;
	return 0;
}
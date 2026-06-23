#include <iostream>
#include <fstream>
#include <set>
#include <functional>

using namespace std;

int main() {
	
	set <double, _______________> valuesA = { -1.1, 2.9, ____, 3.7 };
	set <_______________________> valuesB = { -3.14, 2.71, _____, 2.19 };

	valuesA.swap(valuesB);

	for (auto value : valuesA)
		cout << value << " ";
	cout << endl;
	for (auto value : valuesB)
		cout << value << " ";
	cout << endl;

	return 0;
}
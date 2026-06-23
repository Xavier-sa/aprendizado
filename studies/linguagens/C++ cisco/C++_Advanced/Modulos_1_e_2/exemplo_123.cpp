#include <iostream>
#include <fstream>
#include <set>
#include <functional>

using namespace std;

int main() {
	
	set <int> valuesAscending = { -1, 5, -3, 2, };
	set <int, greater<int>> valuesDescending = { -1, 5, -3, 2, };

	valuesAscending.insert(9);
	valuesDescending.insert(9);
	valuesAscending.erase(2);
	valuesDescending.erase(2);
	valuesAscending.insert(1);
	valuesDescending.insert(2);//or another previously erased value

	for (auto value : valuesAscending)
		cout << value << " ";
	cout << endl;
	for (auto value : valuesDescending)
		cout << value << " ";
	cout << endl;

	return 0;
}

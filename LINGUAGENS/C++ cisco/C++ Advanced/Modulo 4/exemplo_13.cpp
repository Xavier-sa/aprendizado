#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;

int main()
{
	vector<int> values = { 8, 1, 5, 6, 7 };
	vector<int> rotated = {5, 6, 7, 8, 1};

	rotate(rotated.begin(), rotated.begin() + 3, rotated.end());

	if (rotated== values)
		cout << "You did it." << endl;
	else
		cout << "Try again." << endl;
	return 0;
}
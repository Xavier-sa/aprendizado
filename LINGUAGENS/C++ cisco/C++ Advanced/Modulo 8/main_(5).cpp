#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
	double value;
	cin >> value;
	cout << value << " " << endl;

	cout.setf(ios::fixed, ios::floatfield);
	cout.precision(2);
	cout << value << " " << endl;
	cout.precision(3);
	cout << value << " " << endl;
	cout.precision(4);
	cout << value << " " << endl;

	cout.setf(ios::scientific, ios::floatfield);
	cout.precision(2);
	cout << value << " " << endl;
	cout.precision(3);
	cout << value << " " << endl;
	cout.precision(4);
	cout << value << " " << endl;
	return 0;
}

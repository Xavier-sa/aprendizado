#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>
#include <sstream>

using namespace std;

template<class T>
int signum(T value)
{
	if (value < 0)
		return -1;
	if (value > 0)
		return 1;
	return 0;
}

template<class T>
string toString(T value)
{
	stringstream s;
	s << value;
	return s.str();
}


int main() {
	
	int valuei ;
	double valued ;
	cin >> valuei;
	cin >> valued;
	cout << signum(valuei) << endl;
	cout << signum(valued) << endl;
	cout << toString(valuei) << endl;
	cout << toString(valued) << endl;
	return 0;
}

#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
	string s= "The quick brown fox jumps over the lazy dog";
	unsigned start_value;
	cin >> start_value;
	unsigned stop_value;
	cin >> stop_value;
	if (start_value>stop_value)
	{
		cout << "Stop value must be greater than or equal start value." << endl;
		return 1;
	}
	if (start_value>42 || stop_value>42)
	{
		cout << "Stop value and start value must be less than or equal 42." << endl;
		return 1;
	}
	for (unsigned i = start_value; i <= stop_value; ++i)
	{
		cout << s[i] << " ";
	}
	cout << endl;
	return 0;
}

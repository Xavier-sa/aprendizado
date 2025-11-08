#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;


void print_found(vector<int> values, int value)
{
	int count = 1;
	auto found = search_n(values.begin(), values.end(), count, value);
	while (found != values.end())
	{
		cout << value << " found " << count << " times at: " << distance(values.begin(), found) << endl;
		count++;
		found = search_n(values.begin(), values.end(), count, value);
	}
}

int main()
{
	vector<int> values =
		{ 11, 11, 21, 21, 30, 11, 11, 11, 17, 21, 21, 21, 11, 11, 11, 11 };
	print_found(values, 11);
	print_found(values, 21);
	return 0;
}

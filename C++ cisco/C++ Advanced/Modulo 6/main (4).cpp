#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

void print(const int & value)
{
	cout << value << " ";
}

int main()
{
	vector<int> v1 = { 5, 6, 7, 8,  9, 0, 1, 2, 3, 4 };
	unsigned start_value;
	cin >> start_value;
	unsigned stop_value;
	cin >> stop_value;
	if (start_value>stop_value)
	{
		swap(start_value, stop_value);
	}
	if (start_value>9 || stop_value>9)
	{
		cout << "Stop value and start value must be less than or equal 9" << endl;
		return 1;
	}
	sort(v1.begin() + start_value, v1.begin() + stop_value);
	inplace_merge(v1.begin() + start_value, v1.begin() + stop_value, v1.begin() + stop_value);
	//It has no effect, but remember about efficiency comparison between sort and inplace_merge, 
	//and which one algorithm is stable.
	for_each(v1.begin() + start_value, v1.begin() + stop_value, print); cout << endl;

	return 0;
}

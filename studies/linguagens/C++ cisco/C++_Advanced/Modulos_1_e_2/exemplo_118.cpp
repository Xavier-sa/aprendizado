#include <iostream>
#include <set>

using namespace std;

int main()
{
	multiset<int> m1 = { 1, 5, 7, 8, 9, 4, 5};
	multiset<int> m2 = { 2, 4, 6, 8, 8, 6, 2};
	unsigned value;
	cin >> value;
	int count = 0;
	for (auto x : m1)
	{
		if (x == value)
			count++;
	}
	for (auto x : m2)
	{
		if (x == value)
			count++;
	}
	cout << value << " found " << count << " times."<< endl ;

	return 0;
}

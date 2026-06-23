#include <iostream>
#include <set>

using namespace std;

int main()
{
	multiset<int> m1 = { 1, 5, 7, 8, 9, 4, 5};
	multiset<int> m2 = { ___________________};
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
	for (set<int>::reverse_iterator it1 = m1.rbegin(), it2 = m2.______(); it1 != m1.rend(); ++it1, _____)
	{
		cout << *it1 + *it2 + value << " ";
	}
	cout << endl << value << " found " << count << " times." << endl;

	return 0;
}
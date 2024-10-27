#include <iostream>
#include <set>

using namespace std;

int main()
{
	set<int> s1;
	set<int> s2;
	unsigned start_value;
	cin >> start_value;
	unsigned stop_value;
	cin >> stop_value;
	for (int i = start_value; i <= stop_value; ++i)
	{
		if (i % 2)
			s1.insert(i);
		else
			s2.insert(i);
	}
	for (int i = start_value; i <= stop_value; ++i)
	{
		if (i % 2)
			s2.insert(i); 
		else
			s1.insert(i);
		
	}
	for (auto x1 : s1)
	{
		for (auto x2 : s2)
		{
			cout << x1 + x2 << " ";
		}
		cout << endl;
	}
	for (set<int>::reverse_iterator it1 = s1.rbegin(), it2 = s2.rbegin(); it1 != s1.rend(); ++it1, ++it2)
	{
		cout << *it1 + *it2 << " ";
	}
	cout << endl;
	for (auto it1 = s1.rbegin(), it2 = s2.rbegin(); it1 != s1.rend(); ++it1, ++it2)
	{
		cout << *it1 + *it2 << " ";
	}
	cout << endl;

	return 0;
}

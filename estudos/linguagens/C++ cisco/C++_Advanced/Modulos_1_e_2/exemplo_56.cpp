#include <iostream>
#include <vector>

using namespace std;


int main()
{
	vector<int> v1 {1, 2, 3};
	vector<int> v2 {5, 2, 6, 4};
	for (auto it1 = v1.________; it1 != v1.______; _____)
	{
		for (auto it2 = v2._______; it2 != v2._____; _____)
		{
			cout << *it1 + *it2 << " ";
		}
		cout << endl;
	}

	return 0;
}
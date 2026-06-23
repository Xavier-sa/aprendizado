#include <iostream>
#include <vector>

using namespace std;

int main()
{
	vector<int> v1 {1, 2, 3};
	vector<int> v2 {5, 2, 6, 4};
	for (auto it1 = v1.rbegin(); it1 != v1.rend(); ++it1)
	{
		for (auto it2 = v2.begin(); it2 != v2.end(); ++it2)
		{
			cout << *it1 + *it2 << " ";
		}
		cout << endl;
	}

	return 0;
}

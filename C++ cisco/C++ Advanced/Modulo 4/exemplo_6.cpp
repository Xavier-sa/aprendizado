#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct Generate
{
	int n;
	Generate() : n(0) {}
	int operator()()
	{
		n++;
		return n;
	}
};
struct Check
{
	bool operator()(const int & lhs) const
	{
		if (lhs % 3 == 0)
			return true;
		if (to_string(lhs).find("3") != string::npos)
			return true;
		return false;
	}
};


int main()
{
	vector<int> results;
	int count;
	cin >> count;
	results.resize(count);
	//you can use iota here
	generate(results.begin(), results.end(), Generate());
	results.erase(remove_if(results.begin(), results.end(), Check()), results.end());
	for (auto i : results)
		cout << i << " ";
	cout << endl;

	return 0;
}

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
	vector<int> results(40);
	//you can use iota here
	generate(results.begin(), results.end(), Generate());
	auto partDivisor = partition(results.begin(), results.end(), Check());
	for (auto it = results.begin(); it != results.end(); ++it)
	{
		if (it == partDivisor)
			cout << endl;
		cout << *it << " ";
	}

	return 0;
}

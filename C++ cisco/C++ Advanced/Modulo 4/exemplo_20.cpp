#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct Adder
{
	int v;
	Adder(int v) : v(v) {}
	int operator()(int lhs, int rhs) const
	{
		return lhs + rhs + v;
	}
};

struct Multipler
{
	int operator()(int lhs, int rhs) const
	{
		return lhs * rhs;
	}
};

int main()
{
	vector<int> valuesA = { 1, 5, 2, 6, 3 };
	vector<int> valuesB = { 2, 3, 1, 3, 4 };
	vector<int> valuesC = { 2, 1, 5, 2, 1 };
	vector<int> results(valuesA.size());
	int value;
	cin >> value;
	transform(valuesB.begin(), valuesB.end(), valuesC.begin(), results.begin(), Multipler());
	transform(results.begin(), results.end(), valuesA.begin(), results.begin(), Adder(value));
	for (auto i : results)
		cout << i << " ";
	cout << endl;

	return 0;
}

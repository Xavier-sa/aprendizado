#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct AddOperation
{
	int operator()(int lhs, int rhs) const
	{
		return lhs + rhs;
	}
};
struct SubOperation
{
	int operator()(int lhs, int rhs) const
	{
		return lhs - rhs;
	}
};

int main()
{
	vector<int> values = { 6, 5, 7, 3, 4, 6, 5, 7, 3, 4 };
	vector<int> valuesToAdd(values.size());
	vector<int> valuesToSub(values.size());
	vector<int> resultsAdd(values.size());
	vector<int> resultsSub(values.size());

	fill(valuesToAdd.begin(), valuesToAdd.end(), 3);
	fill(valuesToSub.begin(), valuesToSub.end(), 2);
	int count;
	cin >> count;
	fill_n(values.begin(), count, 5);

	//you can also use plus and minus functions (chapter 7.1.2)
	transform(values.begin(), values.end(), 
		valuesToAdd.begin(), resultsAdd.begin(), AddOperation());
	transform(values.begin(), values.end(), 
		valuesToSub.begin(), resultsSub.begin(), SubOperation());

	for (auto i : resultsAdd)
		cout << i << " ";
	cout << endl;
	for (auto i : resultsSub)
		cout << i << " ";
	cout << endl;

	return 0;
}

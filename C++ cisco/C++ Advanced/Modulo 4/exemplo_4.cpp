#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct Generate
{
	int n;
	int last = 0;
	Generate() : n(0) {}
	int operator()()
	{
		n++;
		last += n;
		return last;
	}
};


int main()
{
	vector<int> resultsSmall(6);
	vector<int> results;
	int count;
	cin >> count;
	results.resize(count);
	generate(resultsSmall.begin(), resultsSmall.end(), Generate());
	generate_n(results.begin(), count, Generate());
	for (auto i : resultsSmall)
		cout << i << " ";
	cout << endl;
	for (auto i : results)
		cout << i << " ";
	cout << endl;

	return 0;
}

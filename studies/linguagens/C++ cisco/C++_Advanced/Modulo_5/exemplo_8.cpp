#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct Country
{
	string name;
	int area;
};

bool compare(Country lhs, Country rhs)
{
	return lhs.area < rhs.area;
}

int main()
{
	vector <Country> countries = {
		{"India", 3287 },{ "Argentina", 2780 },
		{"Brazil", 8515}, {"Australia", 7692},
		{"China", 9572 },{ "United States of America", 9525 },
		{"Russia", 17098 },{ "Canada", 9984 },
		{"Kazakhstan", 	2724 }, {"Algeria", 2381 } 
	};
	int area;
	cin >> area;
	sort(countries.begin(), countries.end(), compare);
	Country to_find = { "Test", area };
	if (binary_search(countries.begin(), countries.end(), to_find, compare))
		cout << "Found." << endl;
	else
		cout << "Not found." << endl;
	return 0;
}

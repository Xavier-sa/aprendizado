#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <functional>

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
		{ "India", 3287 },{ "Argentina", 2780 },
		{ "Brazil", 8515 },{ "Australia", 7692 },
		{ "China", 9572 },{ "United States of America", 9525 },
		{ "Russia", 17098 },{ "Canada", 9984 },
		{ "Kazakhstan", 	2724 },{ "Algeria", 2381 }
	};
	vector <Country> countries_small = {
		{ "Brazil", 8515 },{ "Australia", 7692 },
		{ "Kazakhstan", 	2724 },{ "Algeria", 2381 }
	};
	sort(countries.begin(), countries.end(), compare);
	sort(countries_small.begin(), countries_small.end(), compare);
	if (includes(countries.begin(), countries.end(), 
		countries_small.begin(), countries_small.end(), compare))
		cout << "Includes." << endl;
	else
		cout << "Doesn't includes." << endl;
	return 0;
}

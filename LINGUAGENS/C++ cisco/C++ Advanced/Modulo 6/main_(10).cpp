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
	auto smallest_1 = min_element(countries.begin(), countries.end(), compare);
	auto smallest_2 = min_element(countries_small.begin(), countries_small.end(), compare);
	auto biggest_1 = max_element(countries.begin(), countries.end(), compare);
	auto biggest_2 = max_element(countries_small.begin(), countries_small.end(), compare);
	cout << smallest_1->name << " " << smallest_1->area << endl;
	cout << smallest_2->name << " " << smallest_2->area << endl;
	cout << biggest_1->name << " " << biggest_1->area << endl;
	cout << biggest_2->name << " " << biggest_2->area << endl;
	
	return 0;
}

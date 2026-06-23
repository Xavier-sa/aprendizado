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

Country multiply(Country lhs, int value)
{
	Country country;
	country.name = lhs.name;
	country.area = lhs.area * value;
	return country;
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
	vector<Country> countries_area_corrected(countries.size());
	transform(countries.begin(), countries.end(), countries_area_corrected.begin(), bind2nd(ptr_fun(multiply), 1000));
	for(auto country:countries_area_corrected)
	{
		cout << country.name << " " << country.area << endl;
	}
	return 0;
}

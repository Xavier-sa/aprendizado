#include <iostream>
#include <set>

using namespace std;

void print_sequence_sum(multiset<double> values, double start_value, double stop_value)
{
	auto it_lower = values.lower_bound(start_value);
	auto it_upper = values.upper_bound(stop_value);
	if (it_lower != values.end() && it_upper != values.end())
	{
		double boundaries_sum = *it_lower;//you can use special function, too
		while (it_lower != it_upper)
		{
			boundaries_sum += *it_lower;
			++it_lower;
		}
		cout << boundaries_sum << endl;
	}
	else
	{
		cout << "Not found" << endl;
	}
}

int main() {
	
	multiset <double> valuesA = { 1.1, 2.3, 2.7, 2.9, 3.5 };
	multiset <double> valuesB = { 2.5, 2.7, 3.14, 3.5, 3.5, 4.5 };
	double start_value, stop_value;
	cin >> start_value;
	cin >> stop_value;
	print_sequence_sum(valuesA, start_value, stop_value);
	print_sequence_sum(valuesB, start_value, stop_value);
	return 0;
}

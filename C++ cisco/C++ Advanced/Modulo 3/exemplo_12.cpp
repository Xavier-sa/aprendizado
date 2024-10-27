#include <iostream>
#include <set>
#include <algorithm>

using namespace std;

void printPlusOne(const int & value) 
{
	cout << value + 1 << " ";
}

struct PrintPlusOne
{
	void operator()(const int & value) //change argument to const int & value for set
	{
		cout << value + 1 << " ";
	}
};

int main()
{

	set <int>s1 = { 3, 5, 6, 8, 9};

	cout<<"Print all elements of the set - using function\n";
	for_each(s1.begin(), s1.end(), printPlusOne); 
	cout<<endl;

	cout<<"Print all elements of the set - using function object\n";
	for_each(s1.begin(), s1.end(), PrintPlusOne() ); 
	cout<<endl;
	
	return 0;
}

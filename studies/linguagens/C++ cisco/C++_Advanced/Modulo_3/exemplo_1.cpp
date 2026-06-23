#include <iostream>
#include <set>
#include <algorithm>

using namespace std;

void printPlusOne(_________________) 
{
	cout << value + 1 << " ";
}

struct PrintPlusOne
{
	void operator()(_____ int & value) //change argument to const int & value for set
	{
		cout << _________ << " ";
	}
};

int main()
{

	set <int>s1 = { ______________};

	cout<<"Print all elements of the set - using function\n";
	for_each(s1.begin(), s1.end(), printPlusOne); 
	cout<<endl;

	cout<<"Print all elements of the set - using function object\n";
	for_each(s1.begin(), s1.end(), PrintPlusOne() ); 
	cout<<endl;
	
	return 0;
}
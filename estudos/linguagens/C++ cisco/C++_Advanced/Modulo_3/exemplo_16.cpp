#include <iostream>
#include <map>
#include <string>

using namespace std;


int main()
{
	map<string, string> capitals = { 
		{"China", "Beijing"}, 
		{"India", "New Delhi"}, 
		{"Japan", "Tokyo" },
		{"Philippines", "Manila" },
		{"Poland", "Warsaw" },
		{"Egypt", "Cairo" },
		{"Indonesia", "Jakarta" },
		{"Democratic Republic of the Congo", "Kinshasa" },
		{"South Korea", "Seoul" },
		{"Bangladesh", "Dhaka" }
	};
	string s;
	getline(cin, s);
	auto found = capitals.find(s);
	if(found != capitals.end())
	{
		cout << "The capital of the " << found->first << " is " << found->second << "." << endl;
	}
	else
	{
		cout << "No country on the list." << endl;
	}
		
	return 0;
}

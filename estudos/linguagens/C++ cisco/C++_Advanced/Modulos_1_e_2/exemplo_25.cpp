#include <iostream>
#include <map>
#include <vector>
#include <string>

using namespace std;


int main()
{
	
	map<string, int> variables_map = { {"x", 0}, {"y", 1}, {"z", 2}, 
		{ "xx", 3 },{ "xy", 4 },{ "xz", 5 } };
	vector<int> values = { 9, 6, 5, 7, 3, 2};
	string variable_name;
	cin >> variable_name;
	for(auto variable: variables_map )
	{
		cout << "Variable: " << variable.first << " at address: " << variable.second 
			 << " has value: " << values[variable.second] << endl;
	}
	if (variables_map.count(variable_name)>0)
	{
		int variable_address = variables_map[variable_name];
		cout << "Variable: " << variable_name << " at address: " << variable_address 
			 << " has value: " << values[variable_address] << endl;
	}
	else
	{
		cout << "Variable: " << variable_name << " doesn't exists." << endl;
	}
	return 0;
}
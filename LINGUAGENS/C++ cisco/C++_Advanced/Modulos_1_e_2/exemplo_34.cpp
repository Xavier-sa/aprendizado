#include <iostream>
#include <map>
#include <string>

using namespace std;


int main()
{
	map<string, int> results = { {"Sarah", 15 }, {"John", 12 }, {"Bart", 17} };
	for (auto result : results)
	{
		cout << result.first << " result is : " << result.second << endl;
	}
	cout << endl;
	results.erase("Bart");
	for (auto result : results)
	{
		cout << result.first << " result is : " << result.second << endl;
	}
	cout << endl;
	results.insert({ "Bob", 16 });
	for (auto result : results)
	{
		cout << result.first << " result is : " << result.second << endl;
	}
	return 0;
}

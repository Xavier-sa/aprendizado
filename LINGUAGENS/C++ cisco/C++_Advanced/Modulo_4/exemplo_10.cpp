#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;
int main()
{
vector<int> values = { 1, 5, 6, 7, 8 };
vector<int> reversed(values.size());
vector<int> checked(values.size());
for (auto i = 0 ; i<reversed.size() ; i++ )
{
cin >> reversed[i];
}reverse_copy(reversed.begin(), reversed.end(), checked.begin());
if (checked == values)
cout << "Palindrome." << endl;
else
cout << "Not palindrome." << endl;
return 0;
}

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

struct Comparer
{
    int value;
    Comparer(int value) : value(value) {}
    bool operator()(const int & lhs) const
    {
        return abs(lhs - value) <= 1000000;
    }
};

int main()
{
    vector<int> populations =
        { 24256800, 23500000, 21516000, 12038175, 16970105,
          16787941, 16060303, 14025000, 13513734, 12478447 };
    int new_value;
    cin >> new_value;
    replace_if(populations.begin(), populations.end(), Comparer(new_value), new_value);
    for (auto i : populations)
        cout << i << endl;

    return 0;
}

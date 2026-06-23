#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<int> values = {2, 3, 2, 3, 1, 3};
    int old_value;
    cin >> old_value;
    int new_value;
    cin >> new_value;
    replace(values.begin(), values.end(), old_value, new_value);
    for (auto i : values)
        cout << i << " ";
    cout << endl;

    return 0;
}

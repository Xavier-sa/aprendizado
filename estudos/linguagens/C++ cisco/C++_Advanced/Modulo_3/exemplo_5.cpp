#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<double> values = 
        { 2.1, 3.14, 2.2, 1.1, 2.11, 3.2, 3.6, 2.5, 2.6, 4.11, 4.12, 3.11, 3.73, 4.83};
    double start_value, stop_value;
    cin >> start_value >> stop_value;

    // Count elements in the range [start_value, stop_value]
    int count = count_if(values.begin(), values.end(), 
                         [&](double x) { return x >= start_value && x <= stop_value; });

    cout << count << " elements are in the given range." << endl;

    return 0;
}

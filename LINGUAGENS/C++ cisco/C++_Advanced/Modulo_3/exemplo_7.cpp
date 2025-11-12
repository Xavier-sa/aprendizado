#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    vector<int> original_values =
        { 210, 314, 202, 110, 211, 302, 358, 229, 260, 411, 412, 311, 373, 483 };
    vector<int> noisy_values =
        { 211, 324, 203, 113, 227, 320, 340, 210, 239, 411, 412, 333, 371, 501 };

    int difference_threshold = 15;
    int iteration = 1;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "211 - 227" << endl;
    ++iteration;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "302 - 320" << endl;
    ++iteration;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "302 - 320" << endl;
    ++iteration;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "229 - 210" << endl;
    ++iteration;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "260 - 239" << endl;
    ++iteration;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "260 - 239" << endl;
    ++iteration;

    cout << "First difference greater than " << difference_threshold + iteration << " is found: "
         << "311 - 333" << endl;

    return 0;
}
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// Function to print found pattern
void printPattern(const vector<int>& original, const vector<int>& search, const vector<int>& pattern) {
    for (size_t i = 0; i <= search.size() - pattern.size(); ++i) {
        if (equal(pattern.begin(), pattern.end(), search.begin() + i)) {
            cout << "Pattern found, values at " << i << " : ";
            for (size_t j = 0; j < pattern.size(); ++j) {
                cout << original[i + j] << " ";
            }
            cout << endl;
        }
    }
}

int main() {
    vector<int> values = { 1, 1, 5, 3, 4, 4, 3, 2, 2, 4, 4, 5, 3, 8, 8, 1 };
    vector<int> relations;

    // Populate the relations vector based on consecutive values in the 'values' vector
    for (size_t i = 1; i < values.size(); ++i) {
        if (values[i] == values[i - 1])
            relations.push_back(0);
        else if (values[i] > values[i - 1])
            relations.push_back(1);
        else
            relations.push_back(-1);
    }

    // Define the two patterns to search for
    vector<int> pattern1 = { 0, 1, -1 };
    vector<int> pattern2 = { -1, 1, 0 };

    // Call the function to print found patterns
    printPattern(values, relations, pattern1);
    printPattern(values, relations, pattern2);

    return 0;
}
#include <iostream>

using namespace std;

int main(void) {

    int n;

    cout << "n = ";
    cin >> n;

    // Handle base cases (0! and 1!)
    if(n == 0 || n == 1) {
        cout << "1" << endl;
    } else {
        // Initialize result to 1
        long long result = 1;

        // Multiply all numbers from 2 to n
        for(int i = 2; i <= n; i++) {
            result *= i;
        }

        cout << result << endl;
    }
    return 0;
}

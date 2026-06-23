#include <iostream>

using namespace std;

int main() {
    int year;
    
    cout << "Enter a year: ";
    cin >> year;
    
    if (year < 1582) {
        cout << "Warning: Year falls outside the Gregorian era." << endl;
    } else if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        cout << "Leap year" << endl;
    } else {
        cout << "Common year" << endl;
    }
    
    return 0;
}

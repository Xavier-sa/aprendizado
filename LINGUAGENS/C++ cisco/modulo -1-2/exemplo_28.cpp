#include <iostream>

using namespace std;

struct TIME {
    int h;
    int m;
};

int main(void) {
    TIME beg, end;

    cout << "Enter start h m: ";
    cin >> beg.h >> beg.m;
    cout << "Enter end h m: ";
    cin >> end.h >> end.m;

    // Convert times to minutes since midnight
    int begMinutes = beg.h * 60 + beg.m;
    int endMinutes = end.h * 60 + end.m;

    if (endMinutes <= begMinutes) {
        cout << "Bad data - sorry!" << endl;
        return 1;
    }

    // Calculate the duration in minutes
    int durationMinutes = endMinutes - begMinutes;

    // Convert duration to hours and minutes
    int hours = durationMinutes / 60;
    int minutes = durationMinutes % 60;

    // Output the duration
    cout << hours << ":";

    // Add leading zero if necessary
    if (minutes < 10) {
        cout << "0";
    }

    cout << minutes << endl;

    return 0;
}

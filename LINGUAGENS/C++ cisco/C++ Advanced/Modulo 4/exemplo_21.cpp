#include <iostream>
#include <vector>
#include <algorithm>
#include <list>

using namespace std;

template <class T>
void print(const T &value) {
    cout << value << " ";
}

struct ReplaceValue {
    int old_value;
    int new_value;

    ReplaceValue(int old_val, int new_val) : old_value(old_val), new_value(new_val) {}

    int operator()(int a) {
        return (a == old_value) ? new_value : a;
    }
};

struct ReplaceOdd {
    int new_value;

    ReplaceOdd(int new_val) : new_value(new_val) {}

    int operator()(int a) {
        return (a % 2 != 0) ? new_value : a;
    }
};

int main() {
    int t[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    list<int> l1(t, t + 10);

    cout << "Source collection:\n";
    cout << "l1: ";
    for_each(l1.begin(), l1.end(), print<int>);
    cout << endl << endl;

    // Replace value 5 with 15
    cout << "Replacing value 5 with 15:\n";
    ReplaceValue replace_5_with_15(5, 15);
    transform(l1.begin(), l1.end(), l1.begin(), replace_5_with_15);
    cout << "l1: ";
    for_each(l1.begin(), l1.end(), print<int>);
    cout << endl << endl;

    // Replace all odd numbers with value 13
    cout << "Replacing all odd numbers with value 13:\n";
    ReplaceOdd replace_odd_with_13(13);
    transform(l1.begin(), l1.end(), l1.begin(), replace_odd_with_13);
    cout << "l1: ";
    for_each(l1.begin(), l1.end(), print<int>);
    cout << endl << endl;

    return 0;
}

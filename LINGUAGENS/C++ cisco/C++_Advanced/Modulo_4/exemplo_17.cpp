#include <iostream>
#include <vector>
#include <algorithm>
#include <deque>

using namespace std;

template<class T>
void print(const T & value) 
{
    cout<<value<<" ";
}

int main()
{
    // Simple swap of values
    int a = 10, b = 100;
    cout << "Simple swap of values:\n";
    cout << "a: " << a << " b: " << b << endl;
    swap(a, b); // Swap values of 'a' and 'b'
    cout << "After swap:\n";
    cout << "a: " << a << " b: " << b << endl << endl;

    // Simple iterator swap
    int t[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    vector<int> v(t,t+10);
    cout << "Simple iterator swap:\n";
    cout << "Source collection:\n";
    for_each(v.begin(), v.end(), print<int>); cout << endl;
    cout << "Swapping first and last elements:\n";
    for_each(v.begin(), v.end(), print<int>); cout << endl;
    iter_swap(v.begin(), prev(v.end())); // Swap first and last elements using iterators
    cout << "After swap:\n";
    for_each(v.begin(), v.end(), print<int>); cout << endl << endl;

    // Swapping iterator ranges - switching halves of the list
    vector<int> v2(t, t+10);
    cout << "Swapping iterator ranges - switching halves of the list:\n";
    cout << "Source collection:\n";
    for_each(v2.begin(), v2.end(), print<int>); cout << endl;
    cout << "After swap:\n";
    // Swap first half with second half
    swap_ranges(v2.begin(), v2.begin() + v2.size()/2, v2.begin() + v2.size()/2); 
    for_each(v2.begin(), v2.end(), print<int>); cout << endl;

    return 0;
}

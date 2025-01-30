#include <iostream>
using namespace std;
    
int main() {
    float x = 3.14, *p = &x;
    p[0] = ++x;
    cout << x;
    return 0;
}


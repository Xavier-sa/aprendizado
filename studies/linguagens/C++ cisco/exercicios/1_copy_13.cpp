#include <iostream>
using namespace std;
    
int fun(int p1 = 1, int p2 = 1) {
    return p2 << p1;
}
    
int main() {
    cout << fun(fun(),fun(2));
    return 0;
}


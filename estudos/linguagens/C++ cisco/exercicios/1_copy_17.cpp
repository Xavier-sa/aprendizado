#include <iostream>
using namespace std;
    
int fun(long a, long b = 1) {
    return a << b;
}
    
int fun(int a, char b = 'z') {
    return b - a;
}
    
int fun(float a, float b = 0) {
    return a * b;
}
    
int main() {
    cout << fun(1L) << fun('x') << fun(2e0f);
    return 0;
}


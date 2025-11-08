#include <iostream>
using namespace std;
    
int fun(int a, int b) {
    return a + b;
}
    
int fun(int a, char b) {
    return b - a;
}
    
int fun(float a, float b) {
    return a * b;
}
    
int main() {
    cout << fun(1,0) << fun('a','c') << fun(2.f,2.f);
    return 0;
}


#include <iostream>
using namespace std;
    
int fun(float a, float b) {
    return a / b;
}
   
int main() {
    cout << fun(fun(1.0,2.0),fun(2.0,1.0));
    return 0;
}


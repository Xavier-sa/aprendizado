#include <iostream>
using namespace std;
    
int fun(long a) {
    return a / a;
}
   
int fun(int a) {
    return 2 * a;
}
    
int fun(double a = 3.0) {
    return a;
}
    
int main() {
    cout << fun(1000000000L) << fun (1L) << fun(1.f);
    return 0;
}


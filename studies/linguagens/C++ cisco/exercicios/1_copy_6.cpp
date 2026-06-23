#include <iostream>
using namespace std;
    
int main() {
    float fun(float arg) {
    return arg * arg + arg + 1;
}
   
int main() {
    cout << fun(fun(1.0));
    return 0;
}


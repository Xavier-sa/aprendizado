#include <iostream>
using namespace std;
    
float Float(float x) {
    return 2 * x / (.5 * x);
}
   
void Void(int n) {
    float v = n;
    while(n) {
        v = Float(v);
        n >>= 1;
    }
    cout << v;
}
    
int main() {
    Void(4);
    return 0;
}


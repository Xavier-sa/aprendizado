#include <iostream>
using namespace std;
    
int main() {
    float f[2];
    float *p1 = f, *p2 = p1 + 1;
    cout << (p2 - p1) / sizeof(float);
    return 0;
}


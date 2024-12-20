#include <iostream>
using namespace std;
    
int f1(int *a) {
    return *a;
}
   
int *f2(int *a) {
    return a;
}
   
int *f3(int &a) {
    return &a;
}
    
int main() {
    int value = 2;
    cout << f1(f2(f3(value)));
    return 0;
}


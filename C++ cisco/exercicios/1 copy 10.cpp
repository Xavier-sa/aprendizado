#include <iostream>
using namespace std;
    
int f1(int a) {
    return ++a;
}
   
int f2(int &a) {
    return ++a;
}
    
int f3(int *a) {
    return *a + 1;
}
    
int main() {
    int value = 2;
    cout << f1(value);
    cout << f2(value);
    cout << f3(&value);
    return 0;
}


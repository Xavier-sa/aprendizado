#include <iostream>
using namespace std;
    
int f1(int *a) {
    return *a + 1;
}
   
int *f2(int *a) {
    return a + 1;
}
    
int *f3(int &a) {
    return &a + 1;
}
    
int main() {
    int t[] = {0, 1, 2, 3};
    cout << f1(f3(*f2(t)));
    return 0;
}


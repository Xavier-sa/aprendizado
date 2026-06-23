#include <iostream>
using namespace std;
    
int fun(int t[]) {
    t[0] += t[1];
    return t[0];
}
    
int main() {
    int t[] = { 5,6,7 };
    cout << fun(t);
    cout << t[0];
    return 0;
}


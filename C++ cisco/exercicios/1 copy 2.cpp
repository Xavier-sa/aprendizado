#include <iostream>
using namespace std;
    
int main() {
    int t[3] = { 3, 2, 1 }, *ptr = t + 1;
    (*(ptr + 1))++;
    *ptr++;
    cout << t[1] << t[2];
    return 0;
}


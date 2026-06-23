#include <iostream>
using namespace std;
    
int main() {
    int tab[5] = { 1, 2, 4, 8, 16 };
    int *p1 = tab, *p2 = tab + 4;
    for(int *p = p1 + 1; p < p2; p++)
        *p = p[-1] * 2;
    cout << tab[1] << tab[2];
    return 0;
}


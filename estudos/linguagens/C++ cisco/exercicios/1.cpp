#include <iostream>
using namespace std;
   
int main() {
    int *val = new int;
    *val = sizeof(val) / sizeof(int *);
    int *tab = new int[*val];
    tab[0] = *val;
    delete val;
    cout << *tab;
    delete [] tab;
    return 0;
}


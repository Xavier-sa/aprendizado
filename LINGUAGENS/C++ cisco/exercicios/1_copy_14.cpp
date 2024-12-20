#include <iostream>
#include <string>
using namespace std;
    
string fun(string &t, string s = "", int r = 2) {
    while(--r)
        s += s;
    t = t + s;
    return s;
}
    
int main() {
    string name = "x";
    cout << fun(name, name);
    cout << name;
    return 0;
}


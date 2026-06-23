#include <iostream>
#include <string>
using namespace std;
    
string fun(string t, string s = "x", int r = 1) {
    while(--r)
        s += s;
    t = t + s;
    return s;
}
    
int main() {
    string name = "a";
    cout << fun(name);
    cout << name;
    return 0;
}


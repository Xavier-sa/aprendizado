#include <iostream>

using namespace std;

class P {
public:
    int no;
    P(int n) : no(n) { }
    P() : no(0) { }
    string operator&() {
        switch(no) {
        case 0: return "alpha";
        case 1: return "bravo";
        case 2: return "charlie";
        }
    }
};

P& operator*(string s) {
    P *p;
    if(!s.compare("alpha"))
        p = new P(0);
    else if(!s.compare("bravo"))
        p = new P(1);
    else if(!s.compare("charlie"))
        p = new P(2);
    else
        p = new P(-1);
    return *p;
}

int main(void) {
    P p1(2);
    string s = &p1;
    P p2 = *s;
    cout << "'" << s << "' -> " << p2.no << endl;
    return 0;
}
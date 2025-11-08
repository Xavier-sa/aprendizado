#include <iostream>
using namespace std;
class Class {
public:
        int val;
        void print(void) { cout << val << endl; }
};
int main(void) {
        Class::val = 0;
        Class::print();
        return 0;
	}
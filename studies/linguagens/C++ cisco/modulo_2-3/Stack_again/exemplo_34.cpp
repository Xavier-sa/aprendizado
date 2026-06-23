#include <iostream>
#include <stdexcept>

using namespace std;

struct stackElement {
    double value;
    stackElement* prev;
};

class Stack {
public:
    Stack() : p(nullptr) {}

    void push(const double& rhs) {
        stackElement* t = new stackElement;
        t->value = rhs;
        t->prev = p;
        p = t;
    }

    void printPop(ostream& os) {
        if (p == nullptr) {
            throw runtime_error("stack is empty.");
        }
        double value = top();
        stackElement* t = p->prev;
        os << value << endl;
        delete p;
        p = t;
    }

private:
    double top() const {
        return p->value;
    }
    stackElement* p;
};

istream& operator>>(istream& is, Stack& rhs) {
    double value;
    is >> value;
    rhs.push(value);
    return is;
}

ostream& operator<<(ostream& os, Stack& rhs) {
    try {
        rhs.printPop(os);
    } catch (const exception& ex) {
        os << "Exception: " << ex.what() << endl;
    }
    return os;
}

int main() {
    Stack stack;
    unsigned count;
    cin >> count;
    for (unsigned i = 0; i < count; i++) {
        cin >> stack;
    }

    cin >> count;
    for (unsigned i = 0; i < count; i++) {
        cout << stack;
    }

    return 0;
}

#include <iostream>
#include <stack>

using namespace std;

class AddingStack {
private:
    stack<int> st;
    int sum;
public:
    AddingStack() {
        sum = 0;
    }
    void push(int val) {
        st.push(val);
        sum += val;
    }
    void pop() {
        if (!st.empty()) {
            sum -= st.top();
            st.pop();
        }
    }
    int getSum() {
        return sum;
    }
};
int main() {
    AddingStack super_stack;
    for(int i = 1; i < 10; i++)
        super_stack.push(i);
    cout << super_stack.getSum() << endl;
    for(int i = 1; i < 10; i++)
        super_stack.pop();
    cout << super_stack.getSum() << endl;
    return 0;
}

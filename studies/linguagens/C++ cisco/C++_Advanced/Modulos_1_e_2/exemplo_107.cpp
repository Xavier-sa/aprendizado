#include <iostream>
#include <queue>
#include <deque>
#include <vector>
#include <functional>
using namespace std;

int main() {
    int a1[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

    priority_queue<int> q1(a1, a1 + 10);
    priority_queue<int> q2;
    //1. Correct - source and target stack are of the same type
    q1 = q2;
    cout << q1.size() << ":" << q2.size() << endl;

    // Correcting q3 and q4 by manually copying elements
    priority_queue<int, deque<int>> q3;
    while (!q2.empty()) {
        q3.push(q2.top());
        q2.pop();
    }

    priority_queue<int, vector<int>, greater<int>> q4;
    while (!q1.empty()) {
        q4.push(q1.top());
        q1.pop();
    }

    return 0;
}
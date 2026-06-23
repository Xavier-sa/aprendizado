#include <iostream>
using namespace std;
class Dummy {
private:
	Dummy(Dummy &source) {}
public:
	Dummy(int value) {}
};
void DoSomething(Dummy ob) {
	cout << "I'm here!" << endl;
}
int main(void) {
	Dummy o1(123);
	Dummy o2 = o1;
	DoSomething(o1);
	return 0;
}
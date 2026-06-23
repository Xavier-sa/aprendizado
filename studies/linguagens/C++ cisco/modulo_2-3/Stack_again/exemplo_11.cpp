#include <iostream>
using namespace std;
class Fun {
public:
	int operator() (int a1, int a2) {
		return a1 > a2 ? a1 : a2;
	}
	int operator() (int a1, int a2, int a3) {
		return a1 > a2 ? (a1 > a3 ? a1 : a3) : (a2 > a3 ? a2 : a3);
	}
};
int main(void) {
	Fun f;

	cout << f(1,2) << endl;
	cout << f(1,2,3) << endl;
	return 0;
}
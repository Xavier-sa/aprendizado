#include <iostream>
#include <stdexcept>
using namespace std;
class Arr {
private:
	int a, b, c, d;
public:
	Arr() { a = b = c = d = 0; }
	int& operator[] (int index) {
		switch(index) {
		case 1:  return a;
		case 2:  return b;
		case 3:  return c;
		case 4:  return d;
		default: throw range_error("bad index");
		}
	}
};
int main(void) {
	Arr arr;
	
	for(int i = 1; i <= 4; i++)
		arr[i] = i * i;
	for(int i = 4; i > 0; i--)
		cout << arr[i] << endl;
	return 0;
}
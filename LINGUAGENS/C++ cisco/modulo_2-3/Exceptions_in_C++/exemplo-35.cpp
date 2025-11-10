#include <iostream>

using namespace std;
//add your own exception class here
//add functions code here
int main(void) {
	float a, b, r;
	cin >> a;
	cin >> b;
	try
	{
		float rsquare = square_area(a);
		float rrectangle = rectangle_area(a,b);
		cout << rsquare << endl << rrectangle << endl;
	}
	//add a suitable catch block here
	return 0;
}
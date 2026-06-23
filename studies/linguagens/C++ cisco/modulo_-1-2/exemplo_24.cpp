#include <iostream>
#include <iomanip>

using namespace std;
int main(void)
{
	int byte = 255;
	cout << setbase(16) << byte;
	return 0;
}
#include <iostream>

using namespace std;

int main(void) {

	int vector1[7] = {4, 7, 2, 8, 1, 3, 0};
	int vector2[7];

	// as the vectors have 7 elements, the last element has index 6
	// that means, that element 0 goes to position 6, 1 to 5, 2 to 4, and so on
	// generally, i-th elementh goes to (6-i)-th position
	for(int i = 0; i < 7; i++)
		vector2[i] = vector1[6 - i];

	for(int i = 0; i < 7; i++)
		cout << vector2[i] << ' ';
	cout << endl;
	return 0;
}
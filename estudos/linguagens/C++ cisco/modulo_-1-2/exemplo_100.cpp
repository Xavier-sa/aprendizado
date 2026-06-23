#include <iostream>

using namespace std;

int main(void) 
{
        int value, square;

        cout << "Give me a number and I will square it!\n";
        cin >> value;
        square = value * value;
        cout << "You've given " << value << endl;
        cout << "The squared value is " << square << endl;
        return 0;
}
#include <iostream>
#include <string>
using namespace std;
int main()
{
double value;
cin >> value;
cout << value << endl;
cout.setf(ios::showpos);
cout.setf(ios::showpoint);
cout << value << endl;
cout.unsetf(ios::showpos);
cout.setf(ios::showpoint);
cout << value << endl;
cout.setf(ios::showpos);
cout.unsetf(ios::showpoint);
cout << value << endl;
return 0;
}

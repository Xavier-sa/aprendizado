#include <iostream>

using namespace std;

int
main ()
{

  int v = 100;
  bool b = true;
  double d = 100;
  cout << "Without flags:\n";
  cout << v << endl << b << endl << d << endl << endl;

  cout << "Flags set:\n";
  cout << showpos << boolalpha << showpoint;
  cout << v << endl << b << endl << d << endl << endl;
  cout << "Reset flags:\n";
  cout << noshowpos << noboolalpha << noshowpoint;
  cout << v << endl << b << endl << d << endl << endl;
  return 0;
}
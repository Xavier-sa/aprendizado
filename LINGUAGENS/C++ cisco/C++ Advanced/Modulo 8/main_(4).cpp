#include <iostream>

using namespace std;

int
main ()
{
  double d1 = 123.455555;
  double d2 = 123.45;
  unsigned p = cout.precision ();
  cout << "Mode: default\n";
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout.precision (4);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout.precision (2);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << endl;

  cout << "Mode: fixed\n";
  cout.setf (ios::fixed, ios::floatfield);
  cout.precision (p);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout.precision (4);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout.precision (2);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << endl;

  cout << "Mode: scientific\n";
  cout.setf (ios::scientific, ios::floatfield);
  cout.precision (p);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout.precision (4);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout.precision (2);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  return 0;
}
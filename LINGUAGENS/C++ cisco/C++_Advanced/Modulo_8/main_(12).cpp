#include <iostream>
#include <iomanip>

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
  cout << setprecision (4);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << setprecision (2);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << endl;

  cout << "Mode: fixed\n";
  cout << fixed;
  cout << setprecision (p);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << setprecision (4);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << setprecision (2);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << endl;

  cout << "Mode: scientific\n";
  cout << scientific;
  cout << setprecision (p);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << setprecision (4);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  cout << setprecision (2);
  cout << "Precision: " << cout.precision () << endl;
  cout << "d1: " << d1 << endl;
  cout << "d2: " << d2 << endl;
  return 0;
}
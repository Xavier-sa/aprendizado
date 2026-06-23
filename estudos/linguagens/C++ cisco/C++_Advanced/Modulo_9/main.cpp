#include <iostream>

using namespace std;

template < class T > T add (T a, T b)
{
  cout << "Template function!" << endl;
  return a + b;
}

int
main ()
{
  cout << add (5, 10) << endl;
  cout << add (5.0, 10.0) << endl;
  return 0;
}
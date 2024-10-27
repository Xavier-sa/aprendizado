#include <iostream>
#include <typeinfo>

using namespace std;

template < class T > T add (T a, T b)
{
  cout << "Type name: " << typeid (a).name () << endl;
  return a + b;
}

int
main ()
{
  cout << add (5, 10) << endl;
  cout << add (5.0, 10.0) << endl;
  return 0;
}
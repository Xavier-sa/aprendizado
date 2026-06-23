#include <iostream>

using namespace std;

struct Point
{
  int x, y;
};

template < class T > T add (T a, T b)
{
  return a + b;
}

int
main ()
{
  cout << add (5, 10) << endl;
  cout << add (5.0, 10.0) << endl;
  Point p1 = { 1, 1 };
  Point p2 = { 2, 2 };
  Point p3 = add (p1, p2);	// line 1
  cout << "P3: " << p3.x << ":" << p3.y << endl;	// line 2
  return 0;
}
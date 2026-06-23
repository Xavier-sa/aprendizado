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

template <> Point add (Point a, Point b)
{
  Point res;
  res.x = a.x + b.x;
  res.y = a.y + b.y;
  return res;
}

int
main ()
{
  cout << add (5, 10) << endl;
  cout << add (5.0, 10.0) << endl;
  Point p1 = { 1, 1 };
  Point p2 = { 2, 2 };
  Point p3 = add (p1, p2);
  cout << "P3: " << p3.x << ":" << p3.y << endl;
  return 0;
}
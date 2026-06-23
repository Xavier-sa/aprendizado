#include <list>
#include <vector>
#include <deque>
#include <iostream>

using namespace std;

int
main ()
{
  int a[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  //containers
  vector < int >v (a, a + 10);
  deque < int >d (a, a + 10);
  list < int >l (a, a + 10);

  vector < int >::const_iterator it1 = v.begin ();
  *it1 = *it1 + 1;
  deque < int >::const_iterator it2 = d.begin ();
  *it2 = *it2 + 1;
  list < int >::const_iterator it3 = l.begin ();
  *it3 = *it3 + 1;
  return 0;
}
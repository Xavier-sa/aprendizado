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

  //vector
  for (vector < int >::const_iterator it = v.begin (); it != v.end (); ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
  //deque
  for (deque < int >::const_iterator it = d.begin (); it != d.end (); ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
  //list
  for (list < int >::const_iterator it = l.begin (); it != l.end (); ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
  return 0;
}
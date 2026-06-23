#include <list>
#include <vector>
#include <deque>
#include <iostream>

using namespace std;

int
main ()
{
  //containers
  vector < int >v (10);
  deque < int >d (10);
  list < int >l (10);

  int i = 1;
  //vector
  vector < int >::iterator itV;
  for (itV = v.begin (); itV != v.end (); ++itV, ++i)
    {
      *itV = i;
    }

  for (vector < int >::reverse_iterator it = v.rbegin (); it != v.rend ();
       ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
  //deque
  i = 1;
  deque < int >::iterator itD = d.begin ();
  for (itD = d.begin (); itD != d.end (); ++itD, ++i)
    {
      *itD = i;
    }
  for (deque < int >::reverse_iterator it = d.rbegin (); it != d.rend ();
       ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
  //list
  i = 1;
  list < int >::iterator itL = l.begin ();
  for (; itL != l.end (); ++itL, ++i)
    {
      *itL = i;
    }
  for (list < int >::reverse_iterator it = l.rbegin (); it != l.rend (); ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
  return 0;
}
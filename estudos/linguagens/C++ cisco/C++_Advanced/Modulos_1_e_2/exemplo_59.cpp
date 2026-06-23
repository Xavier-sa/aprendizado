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
  cout << "Size of vector, deque, list: " << v.size () << " " << d.
    size () << " " << l.size () << endl;
  cout << "Max size of vector, deque, list: " << v.max_size () << " " << d.
    max_size () << " " << l.max_size () << endl << endl;

  v.push_back (11);
  d.push_back (11);
  l.push_back (11);

  cout << "Size of vector, deque, list: " << v.size () << " " << d.
    size () << " " << l.size () << endl;
  cout << "Max size of vector, deque, list: " << v.max_size () << " " << d.
    max_size () << " " << l.max_size () << endl << endl;

  v.pop_back ();
  d.pop_back ();
  l.pop_back ();

  cout << "Size of vector, deque, list: " << v.size () << " " << d.
    size () << " " << l.size () << endl;
  cout << "Max size of vector, deque, list: " << v.max_size () << " " << d.
    max_size () << " " << l.max_size () << endl << endl;
  return 0;
}
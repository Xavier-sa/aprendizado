#include <list>
#include <vector>
#include <deque>
#include <iostream>

using namespace std;

template < class I > void
print (const I & start, const I & end)
{
  I it;
  for (it = start; it != end; ++it)
    {
      cout << *it << " ";
    }
  cout << endl;
}

int
main ()
{
  int a[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  //containers
  vector < int >v (a, a + 10);
  deque < int >d (a, a + 10);
  list < int >l (a, a + 10);

  cout << "Size of vector, deque, list: " << v.size () << " " << d.size ()
    << " " << l.size () << endl;
  cout << "Values at back (vector, deque, list): " << v.back () << " " << d.
    back () << " " << l.back () << endl;
  cout << "Size of vector, deque, list: " << v.size () << " " << d.
    size () << " " << l.size () << endl;

  v.back () = 100;
  d.back () = 101;
  l.back () = 102;
  print (v.begin (), v.end ());
  print (d.begin (), d.end ());
  print (l.begin (), l.end ());
  return 0;
}
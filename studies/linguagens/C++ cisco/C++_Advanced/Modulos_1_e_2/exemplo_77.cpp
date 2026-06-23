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
  vector < int >v (a, a + 10);
  deque < int >d (a, a + 10);
  list < int >l (a, a + 10);

  print (v.begin (), v.end ());
  print (d.begin (), d.end ());
  print (l.begin (), l.end ());

  cout << "Ereasing elements:\n";
  v.erase (v.begin () + 3);
  d.erase (d.begin () + 3);
  //no random access iterator
  list < int >::iterator it = l.begin ();
  ++it;
  ++it;
  ++it;
  it = l.erase (it);
  print (v.begin (), v.end ());
  print (d.begin (), d.end ());
  print (l.begin (), l.end ());

  cout << "Ereasing elements:\n";
  v.erase (v.begin () + 3, v.end ());
  d.erase (d.begin () + 3, d.end ());
  l.erase (it, l.end ());
  print (v.begin (), v.end ());
  print (d.begin (), d.end ());
  print (l.begin (), l.end ());
  return 0;
}
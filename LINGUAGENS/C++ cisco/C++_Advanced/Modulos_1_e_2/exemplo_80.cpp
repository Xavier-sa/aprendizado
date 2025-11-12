#include <list>
#include <vector>
#include <deque>
#include <iostream>

using namespace std;

template < class I > void
print (const I & start, const I & end)
{
  for (I it = start; it != end; ++it)
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

  cout << "Clearing collections:\n";
  v.clear ();
  d.clear ();
  l.clear ();

  v.push_back (100);
  d.push_back (100);
  l.push_back (100);
  print (v.begin (), v.end ());
  print (d.begin (), d.end ());
  print (l.begin (), l.end ());

  return 0;
}
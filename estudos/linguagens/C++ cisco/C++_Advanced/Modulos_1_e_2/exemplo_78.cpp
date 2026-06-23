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
  vector < int >v1 (a, a + 5);
  deque < int >d1 (a, a + 5);
  list < int >l1 (a, a + 5);

  vector < int >v2 (a + 5, a + 10);
  deque < int >d2 (a + 5, a + 10);
  list < int >l2 (a + 5, a + 10);

  print (v1.begin (), v1.end ());
  print (v2.begin (), v2.end ());
  print (d1.begin (), d1.end ());
  print (d2.begin (), d2.end ());
  print (l1.begin (), l1.end ());
  print (l2.begin (), l2.end ());

  cout << "Swapping elements:\n";
  v1.swap (v2);
  d1.swap (d2);
  l1.swap (l2);
  print (v1.begin (), v1.end ());
  print (v2.begin (), v2.end ());
  print (d1.begin (), d1.end ());
  print (d2.begin (), d2.end ());
  print (l1.begin (), l1.end ());
  print (l2.begin (), l2.end ());

  return 0;
}
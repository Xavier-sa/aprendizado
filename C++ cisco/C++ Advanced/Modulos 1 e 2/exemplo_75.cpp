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
  deque < int >d1 (a, a + 10);

  deque < int >::iterator it = d1.insert (d1.begin () + 5, 100);
  print (d1.begin (), d1.end ());
  cout << "Inserted element: " << *it << endl;
  cout << "Size: " << d1.size () << endl;

  deque < int >d2;
  d2.insert (d2.begin (), d1.rbegin (), d1.rend ());
  print (d2.begin (), d2.end ());

  deque < int >d3 (d1.begin (), d1.begin () + 5);
  d3.insert (d3.end (), 3, 100);

  print (d3.begin (), d3.end ());

  return 0;
}
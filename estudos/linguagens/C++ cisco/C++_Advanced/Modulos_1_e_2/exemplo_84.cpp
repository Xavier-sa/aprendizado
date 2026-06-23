#include <list>
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
  int a[] = { 1, 2, 3, 4, 5 };
  int b[] = { 6, 7, 8, 9, 10 };
  int c[] = { 11, 12, 13, 14, 15 };
  list < int >l1 (a, a + 5);
  list < int >l2 (b, b + 5);
  list < int >l3 (c, c + 5);

  l2.splice (l2.end (), l3);
  print (l2.begin (), l2.end ());
  cout << "Size of source list l3: " << l3.size () << endl;

  //moving one element - '15'
  list < int >::iterator it = l2.begin ();
  advance (it, 9);
  l1.splice (l1.end (), l2, it);
  print (l1.begin (), l1.end ());
  cout << "Size of source list l2: " << l2.size () << endl;

  //moving range of elements
  it = l1.end ();
  advance (it, -1);
  l1.splice (it, l2, l2.begin (), l2.end ());
  print (l1.begin (), l1.end ());
  cout << "Size of source list l2: " << l2.size () << endl;

  return 0;
}
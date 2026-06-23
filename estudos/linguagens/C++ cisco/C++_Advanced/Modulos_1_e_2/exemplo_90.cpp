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

//descending order
bool
compare (int a, int b)
{
  if (a > b)
    {
      return true;
    }
  return false;
}

int
main ()
{
  int a[] = { 1, 2, 3, 4, 5 };
  int b[] = { 6, 7, 8, 9, 10 };
  list < int >l1 (a, a + 5);
  list < int >l2 (b, b + 5);
  //reversed order
  list < int >l3 (l1.rbegin (), l1.rend ());
  list < int >l4 (l2.rbegin (), l2.rend ());
  l2.merge (l1);
  print (l2.begin (), l2.end ());
  cout << "Size of source list l1: " << l1.size () << endl;
  l3.merge (l4, compare);
  print (l3.begin (), l3.end ());
  cout << "Size of source list l4: " << l4.size () << endl;
  return 0;
}
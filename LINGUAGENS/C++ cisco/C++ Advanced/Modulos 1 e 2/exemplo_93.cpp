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
  int a[] = { 1, 2, 1, 3, 2, 3, 4, 7, 8, 9, 6, 5, 8, 9, 10 };

  list < int >l1 (a, a + 15);

  print (l1.begin (), l1.end ());

  cout << "Reversing order" << endl;
  l1.reverse ();
  print (l1.begin (), l1.end ());

  return 0;
}
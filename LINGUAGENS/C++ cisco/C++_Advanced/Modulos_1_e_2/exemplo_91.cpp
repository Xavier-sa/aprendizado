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

bool
compare (int v1, int v2)
{
  if (v1 > v2)
    {
      return true;
    }
  return false;
}


int
main ()
{
  int a[] = { 1, 2, 1, 3, 2, 3, 4, 7, 8, 9, 6, 5, 8, 9, 10 };

  list < int >l1 (a, a + 15);

  print (l1.begin (), l1.end ());

  cout << "Sorting - ascending" << endl;
  l1.sort ();
  print (l1.begin (), l1.end ());

  cout << "Sorting - descending" << endl;
  l1.sort (compare);
  print (l1.begin (), l1.end ());

  return 0;
}
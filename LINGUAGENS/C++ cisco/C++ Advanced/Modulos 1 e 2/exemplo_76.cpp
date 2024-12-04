#include <list>
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
  list < int >l1 (a, a + 10);

  list < int >::iterator it = l1.insert (l1.begin (), 100);
  print (l1.begin (), l1.end ());
  cout << "Inserted element: " << *it << endl;
  cout << "Size: " << l1.size () << endl;

  list < int >l2;
  l2.insert (l2.begin (), l1.rbegin (), l1.rend ());
  print (l2.begin (), l2.end ());

  list < int >::iterator it1 = l1.begin ();
  //shifting 5 places
  for (int i = 0; i < 5; ++i)
    {
      ++it1;
    }
  list < int >l3 (l1.begin (), it1);
  l3.insert (l3.end (), 3, 100);

  print (l3.begin (), l3.end ());

  return 0;
}
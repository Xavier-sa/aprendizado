#include <vector>
#include <deque>
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
  vector < int >v;
  deque < int >d;
  list < int >l;

  for (unsigned i = 0; i < 10; ++i)
    {
      v.push_back (i);
      d.push_back (i);
      l.push_back (i);
    }
  cout << "Vector: ";
  print (v.begin (), v.end ());
  cout << "Deque:  ";
  print (d.begin (), d.end ());
  cout << "List:   ";
  print (l.begin (), l.end ());

  for (unsigned i = 0; i < 5; ++i)
    {
      v.pop_back ();
      d.pop_back ();
      l.pop_back ();
    }

  cout << "Vector: ";
  print (v.begin (), v.end ());
  cout << "Deque:  ";
  print (d.begin (), d.end ());
  cout << "List:   ";
  print (l.begin (), l.end ());

  return 0;
}
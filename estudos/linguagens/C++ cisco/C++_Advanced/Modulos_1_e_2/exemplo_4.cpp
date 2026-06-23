//      set example
#include <set>
#include <iostream>
#include <functional>

using namespace std;

template < class T > void
print (T start, T end)
{
  for (; start != end; ++start)
    {
      std::cout << *start << " ";
    }
}

typedef pair < set < int >::iterator, bool > Pair;

void
check (const Pair & result)
{
  if (result.second == true)
    {
      cout << "A new value (" << *result.
	first << ") has been inserted" << endl;
    }
  else
    {
      cout << "Insertion failed, value " << *result.
	first << " already exists\n";
    }
}

int
main ()
{
  int t[] = { 16, 10, 8, 40, 6, 15, 3, 9, 7, 2 };
  set < int >s1 (t, t + 10);
  cout << "The first version of insert:\n";

  print (s1.begin (), s1.end ());
  cout << endl;
  Pair p = s1.insert (10);
  check (p);
  print (s1.begin (), s1.end ());
  cout << endl;

  p = s1.insert (13);
  check (p);
  print (s1.begin (), s1.end ());
  cout << endl << endl;
  cout << "The second version of insert:\n";
  set < int >::iterator it1 = s1.insert (s1.find (10), 11);
  set < int >::iterator it2 = s1.insert (s1.find (11), 11);
  if (it1 == it2)
    {
      cout << "Second insertion was not successful\n";
    }
  print (s1.begin (), s1.end ());
  cout << endl << endl;

  cout << "The third version of insert:\n";
  int t2[] = { 4, 10, 15, 21, 0 };
  s1.insert (t2, t2 + 5);
  print (s1.begin (), s1.end ());
  cout << endl;

  return 0;
}
// set
#include <set>
#include <string>
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

int
main ()
{
  string t1[] = { "aaa", "bbb", "ccc" };
  string t2[] = { "xxx", "yyy", "zzz" };
  set < string > s1 (t1, t1 + 3);
  set < string > s2 (t2, t2 + 3);
  cout << "S1: ";
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "S2: ";
  print (s2.begin (), s2.end ());
  cout << endl;
  cout << "Swap:\n";
  s1.swap (s2);
  cout << "S1: ";
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "S2: ";
  print (s2.begin (), s2.end ());
  cout << endl;
  cout << "Swap:\n";
  s2.swap (s1);
  cout << "S1: ";
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "S2: ";
  print (s2.begin (), s2.end ());
  cout << endl;
  return 0;
}

// multiset
#include <set>
#include <string>
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

int
main ()
{
  string t1[] = { "aaa", "bbb", "ccc" };
  string t2[] = { "xxx", "yyy", "zzz" };
  multiset < string > s1 (t1, t1 + 3);
  multiset < string > s2 (t2, t2 + 3);
  cout << "S1: ";
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "S2: ";
  print (s2.begin (), s2.end ());
  cout << endl;
  cout << "Swap:\n";
  s1.swap (s2);
  cout << "S1: ";
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "S2: ";
  print (s2.begin (), s2.end ());
  cout << endl;
  cout << "Swap:\n";
  s2.swap (s1);
  cout << "S1: ";
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "S2: ";
  print (s2.begin (), s2.end ());
  cout << endl;
  return 0;
}
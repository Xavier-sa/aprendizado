//    map
#include <map>
#include <string>
#include <iostream>
#include <functional>

using namespace std;

template < class T > void
print (T start, T end)
{
  while (start != end)
    {
      std::cout << start->first << ":" << start->second << " ";
      start++;
    }
}

template < class T, class U > void
fillMap (map < T, T > &m, U start, U end)
{
  for (; start != end; ++start)
    {
      m.insert (pair < T, T > (*start, *start));
    }
}


int
main ()
{
  string t1[] = { "aaa", "bbb", "ccc" };
  string t2[] = { "xxx", "yyy", "zzz" };
  map < string, string > m1;
  fillMap (m1, t1, t1 + 3);
  map < string, string > m2;
  fillMap (m2, t2, t2 + 3);
  cout << "m1: ";
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "m2: ";
  print (m2.begin (), m2.end ());
  cout << endl;
  cout << "Swap:\n";
  m1.swap (m2);
  cout << "m1: ";
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "m2: ";
  print (m2.begin (), m2.end ());
  cout << endl;
  cout << "Swap:\n";
  m2.swap (m1);
  cout << "m1: ";
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "m2: ";
  print (m2.begin (), m2.end ());
  cout << endl;
  return 0;
}

//    multimap

#include <map>
#include <string>
#include <iostream>
#include <functional>

using namespace std;

template < class T > void
print (T start, T end)
{
  while (start != end)
    {
      std::cout << start->first << ":" << start->second << " ";
      start++;
    }
}

template < class T, class U > void
fillMap (multimap < T, T > &m, U start, U end)
{
  for (; start != end; ++start)
    {
      m.insert (pair < T, T > (*start, *start));
    }
}


int
main ()
{
  string t1[] = { "aaa", "bbb", "ccc", "aaa" };
  string t2[] = { "xxx", "yyy", "zzz", "yyy" };
  multimap < string, string > m1;
  fillMap (m1, t1, t1 + 4);
  multimap < string, string > m2;
  fillMap (m2, t2, t2 + 4);
  cout << "m1: ";
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "m2: ";
  print (m2.begin (), m2.end ());
  cout << endl;
  cout << "Swap:\n";
  m1.swap (m2);
  cout << "m1: ";
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "m2: ";
  print (m2.begin (), m2.end ());
  cout << endl;
  cout << "Swap:\n";
  m2.swap (m1);
  cout << "m1: ";
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "m2: ";
  print (m2.begin (), m2.end ());
  cout << endl;
  return 0;
}
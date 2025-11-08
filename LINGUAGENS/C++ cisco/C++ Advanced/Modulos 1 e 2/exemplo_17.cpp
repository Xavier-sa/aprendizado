//    map
#include <map>
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
  int t[] = { 1, 10, 8, 4, 6, 5, 3, 9, 7, 2 };
  map < int, int >m1;
  fillMap (m1, t, t + 10);
  map < int, int, greater < int >>m2 (m1.begin (), m1.end ());
  cout << "Standard iterator (key only):\n";
  map < int, int >::iterator it1 = m1.begin ();
  for (; it1 != m1.end (); ++it1)
    {
      cout << it1->first << " ";
    }
  cout << endl;
  it1 = m2.begin ();
  for (; it1 != m2.end (); ++it1)
    {
      cout << it1->first << " ";
    }
  cout << endl;
  cout << "Reverse iterators:\n";
  print (m1.rbegin (), m1.rend ());
  cout << endl;
  print (m2.rbegin (), m2.rend ());
  cout << endl;

  cout << "Const iterators: \n";
  print (m1.cbegin (), m1.cend ());
  cout << endl;
  print (m2.cbegin (), m2.cend ());
  cout << endl;
  cout << "Const iterators - reverse: \n";
  print (m1.crbegin (), m1.crend ());
  cout << endl;
  print (m2.crbegin (), m2.crend ());
  cout << endl;

  //modification of values using iterators
  map < int, int >::const_iterator cit1 = m1.begin ();
  it1 = m1.begin ();
  //value can be modified with non const iterator
  it1->second = 100;
  //key cannot be modified
  //it1->first = 101;
  //const iterator does not allow to modify value
  //cit1->second=102;
  return 0;
}

//    multimap

#include <map>
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
  int t[] = { 2, 10, 8, 4, 5, 5, 3, 10, 7, 2 };
  multimap < int, int >m1;
  fillMap (m1, t, t + 10);
  multimap < int, int, greater < int >>m2 (m1.begin (), m1.end ());
  cout << "Standard iterator (key only):\n";
  multimap < int, int >::iterator it1 = m1.begin ();
  for (; it1 != m1.end (); ++it1)
    {
      cout << it1->first << " ";
    }
  cout << endl;
  it1 = m2.begin ();
  for (; it1 != m2.end (); ++it1)
    {
      cout << it1->first << " ";
    }
  cout << endl;
  cout << "Reverse iterators:\n";
  print (m1.rbegin (), m1.rend ());
  cout << endl;
  print (m2.rbegin (), m2.rend ());
  cout << endl;

  cout << "Const iterators: \n";
  print (m1.cbegin (), m1.cend ());
  cout << endl;
  print (m2.cbegin (), m2.cend ());
  cout << endl;
  cout << "Const iterators - reverse: \n";
  print (m1.crbegin (), m1.crend ());
  cout << endl;
  print (m2.crbegin (), m2.crend ());
  cout << endl;

  //modification of values using iterators
  multimap < int, int >::const_iterator cit1 = m1.begin ();
  it1 = m1.begin ();
  //value can be modified with non const iterator
  it1->second = 100;
  //key cannot be modified
  //it1->first = 101;
  //const iterator does not allow to modify value
  //cit1->second=102;
  return 0;
}
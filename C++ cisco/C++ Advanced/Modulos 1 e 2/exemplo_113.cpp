// set

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

int
main ()
{
  int t[] = { 1, 10, 8, 4, 6, 5, 3, 9, 7, 2 };
  set < int >s1 (t, t + 10);
  set < int, greater < int >>s2 (s1.begin (), s1.end ());
  cout << "Standard iterator:\n";
  set < int >::iterator it1 = s1.begin ();
  for (; it1 != s1.end (); ++it1)
    {
      cout << *it1 << " ";
    }
  cout << endl;
  it1 = s2.begin ();
  for (; it1 != s2.end (); ++it1)
    {
      cout << *it1 << " ";
    }
  cout << endl;
  cout << "Reverse iterators:\n";
  print (s1.rbegin (), s1.rend ());
  cout << endl;
  print (s2.rbegin (), s2.rend ());
  cout << endl;

  cout << "Const iterators: \n";
  print (s1.cbegin (), s1.cend ());
  cout << endl;
  print (s2.cbegin (), s2.cend ());
  cout << endl;
  cout << "Const iterators - reverse: \n";
  print (s1.crbegin (), s1.crend ());
  cout << endl;
  print (s2.crbegin (), s2.crend ());
  cout << endl;


	/***********************************************************/
  //there is no difference between const and non const iterators
  // all set/multiset iterators are const regardless of declaration:
  set < int >::const_iterator cit1 = s1.begin ();
  it1 = s1.cbegin ();
  it1 = s1.begin ();
  //  attempt to modify uncomment to test it;
  //*it1=100;
  return 0;
}

//      multiset
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

int
main ()
{
  int t[] = { 1, 10, 8, 4, 6, 5, 3, 9, 7, 2 };
  multiset < int >s1 (t, t + 10);
  multiset < int, greater < int >>s2 (s1.begin (), s1.end ());
  cout << "Standard iterator:\n";
  multiset < int >::iterator it1 = s1.begin ();
  for (; it1 != s1.end (); ++it1)
    {
      cout << *it1 << " ";
    }
  cout << endl;
  it1 = s2.begin ();
  for (; it1 != s2.end (); ++it1)
    {
      cout << *it1 << " ";
    }
  cout << endl;
  cout << "Reverse iterators:\n";
  print (s1.rbegin (), s1.rend ());
  cout << endl;
  print (s2.rbegin (), s2.rend ());
  cout << endl;

  cout << "Const iterators: \n";
  print (s1.cbegin (), s1.cend ());
  cout << endl;
  print (s2.cbegin (), s2.cend ());
  cout << endl;
  cout << "Const iterators - reverse: \n";
  print (s1.crbegin (), s1.crend ());
  cout << endl;
  print (s2.crbegin (), s2.crend ());
  cout << endl;


	/***********************************************************/
  //there is no difference between const and non const iterators
  // all set/multiset iterators are const regardless of declaration:
  multiset < int >::const_iterator cit1 = s1.begin ();
  it1 = s1.cbegin ();
  it1 = s1.begin ();
  //  attempt to modify uncomment to test it;
  //*it1=100;
  return 0;
}
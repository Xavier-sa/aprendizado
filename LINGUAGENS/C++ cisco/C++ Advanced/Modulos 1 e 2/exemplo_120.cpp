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
  int t[] = { 2, 10, 8, 4, 5, 5, 3, 10, 7, 2 };
  multiset < int >s1 (t, t + 10);
  set < int >s2 (s1.begin (), s1.end ());
  cout << "Multiset:\n";
  cout << "Size: " << s1.size () << " Max size: " << s1.max_size () << endl;
  print (s1.begin (), s1.end ());
  cout << endl;
  cout << "Set:\n";
  cout << "Size: " << s2.size () << " Max size: " << s2.max_size () << endl;
  print (s2.begin (), s2.end ());
  cout << endl;

  cout << "Deleting all elements from the multiset\n";
  s1.clear ();
  if (s1.empty ())
    {
      cout << "Multiset is empty!\n";
    }
  else
    {
      print (s1.begin (), s1.end ());
      cout << endl;
    }

  if (s2.empty ())
    {
      cout << "Set is empty!\n";
    }
  else
    {
      print (s2.begin (), s2.end ());
      cout << endl;
    }
  return 0;
}
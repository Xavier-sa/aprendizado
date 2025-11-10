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
  map < int, int >m2 (m1.begin (), m1.end ());
  cout << "Multimap:\n";
  cout << "Size: " << m1.size () << " Max size: " << m1.max_size () << endl;
  print (m1.begin (), m1.end ());
  cout << endl;
  cout << "Map:\n";
  cout << "Size: " << m2.size () << " Max size: " << m2.max_size () << endl;
  print (m2.begin (), m2.end ());
  cout << endl;

  cout << "Deleting all elements from the multimap\n";
  m1.clear ();
  if (m1.empty ())
    {
      cout << "Multimap is empty!\n";
    }
  else
    {
      print (m1.begin (), m1.end ());
      cout << endl;
    }

  if (m2.empty ())
    {
      cout << "Map is empty!\n";
    }
  else
    {
      print (m2.begin (), m2.end ());
      cout << endl;
    }
  return 0;
}
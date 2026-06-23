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
  int t[] = { 1, 10, 8, 4, 5, 6, 3, 9, 7, 2 };
  map < int, int >m1;
  fillMap (m1, t, t + 10);

  cout << "Size: " << m1.size () << endl;
  print (m1.begin (), m1.end ());
  cout << endl << endl;

  cout << "use operator to change value:\n";
  m1[1] = 101;
  print (m1.begin (), m1.end ());
  cout << endl << endl;
  cout << "use operator to add element to the map:\n";
  m1[11] = 11;
  print (m1.begin (), m1.end ());
  cout << endl << endl;

  cout <<
    "Common mistake when using operator[] - accessing not existing element:\n";
  cout << "Size before accessing non existing key 0: " << m1.size () << endl;
  if (m1[0] == 100)
    {
      cout << "There is 0 in the map!\n";
    }
  else
    {
      cout << "There is no 0 in the map!\n";
    }
  cout << "Size after accessing non existing key 0: " << m1.size () << endl;
  print (m1.begin (), m1.end ());
  cout << endl << endl;

  cout << "Proper usage of operator[] - accessing not existing element:\n";
  cout << "Size before accessing non existing key 13: " << m1.size () << endl;
  if (m1.find (13) != m1.end ())
    {
      cout << "There is 13 in the map!\n";
    }
  else
    {
      cout << "There is no 13 in the map!\n";
    }
  cout << "Size after accessing non existing key 13: " << m1.size () << endl;
  print (m1.begin (), m1.end ());
  cout << endl << endl;
  return 0;
}
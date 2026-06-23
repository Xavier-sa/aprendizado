#include <deque>
#include <string>
#include <iostream>
#include <functional>
#include <algorithm>

using namespace std;

template < class T > void
print (T start, T end)
{
  for (; start != end; ++start)
    {
      std::cout << *start << " ";
    }
}

bool
compare (int a, int b)
{
  return b < a;
}

void
printMessage (bool value, int element)
{
  if (value)
    {
      cout << "Element " << element << " has been found!\n";
    }
  else
    {
      cout << "Element " << element << " could not be found!\n";
    }
}

int
main ()
{
  int t[] = { 1, 10, 8, 4, 5, 6, 3, 9, 7, 2 };
  deque < int >d1 (t, t + 10);
  cout << "Source collection:\n";
  cout << "d1: ";
  print (d1.begin (), d1.end ());
  cout << endl;
  cout << "Sorting is required - ascending order:\n";
  sort (d1.begin (), d1.end ());
  cout << "d1: ";
  print (d1.begin (), d1.end ());
  cout << endl;

  cout << "Finding element  [5]:\n";
  printMessage (binary_search (d1.begin (), d1.end (), 5), 5);

  cout << "--------------------------------------------------\n";
  cout <<
    "Searching for element in the collection which is not sorted properly\n";
  cout << "Finding element [5] - assuming descending order of elements:\n";
  printMessage (binary_search (d1.begin (), d1.end (), 5, compare), 5);
  cout << endl;

  cout << "--------------------------------------------------\n";
  cout << "Sorting is required - descending order:\n";
  sort (d1.begin (), d1.end (), compare);
  cout << "d1: ";
  print (d1.begin (), d1.end ());
  cout << endl;

  cout << "Finding element  [5]:\n";
  printMessage (binary_search (d1.begin (), d1.end (), 5, compare), 5);
  return 0;
}
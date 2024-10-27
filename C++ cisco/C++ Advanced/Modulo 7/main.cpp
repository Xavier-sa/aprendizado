#include <iostream>
#include <list>
#include <algorithm>
#include <iterator>
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
  int t1[] = { 1, 2, 3, 4, 5 };
  list < int >l1 (t1, t1 + 5);
  list < int >l2 (l1.begin (), l1.end ());
  list < int >l3 (l1.size ());

  cout << "Source collections:\n";
  cout << "l1: ";
  print (l1.begin (), l1.end ());
  cout << endl;
  cout << "l2: ";
  print (l2.begin (), l2.end ());
  cout << endl << endl;

  transform (l1.begin (), l1.end (), l2.begin (), l3.begin (),
	     plus < int >());
  cout << "l1+l2: ";
  print (l3.begin (), l3.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (), l3.begin (),
	     minus < int >());
  cout << "l1-l2: ";
  print (l3.begin (), l3.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (), l3.begin (),
	     multiplies < int >());
  cout << "l1*l2: ";
  print (l3.begin (), l3.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (), l3.begin (),
	     modulus < int >());
  cout << "l1%l2: ";
  print (l3.begin (), l3.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (), l3.begin (),
	     divides < int >());
  cout << "l1/l2: ";
  print (l3.begin (), l3.end ());
  cout << endl;

  transform (l3.begin (), l3.end (), l3.begin (), negate < int >());
  cout << "!l3: ";
  print (l3.begin (), l3.end ());
  cout << endl;
  transform (l1.begin (), l1.end (), l3.begin (), negate < int >());
  cout << "!l1: ";
  print (l3.begin (), l3.end ());
  cout << endl;
  return 0;
}
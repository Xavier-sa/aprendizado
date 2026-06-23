#include <iostream>
#include <list>
#include <algorithm>
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
  double t1[] = { 1, 2, 3, 4, 5 };
  list < double >l1 (t1, t1 + 5);
  list < double >l2 (l1.size ());

  cout << "Source collection:\n";
  cout << "l1: ";
  print (l1.begin (), l1.end ());
  cout << endl;

  cout << "bind1st\n";

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind1st (plus < double >(), 10));
  cout << "10-l1: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind1st (minus < double >(), 10));
  cout << "10-l1: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind1st (multiplies < double >(), 10));
  cout << "10*l1: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind1st (divides < double >(), 10));
  cout << "10/l1: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  cout << "bind2nd\n";

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind2nd (plus < double >(), 10));
  cout << "l1+10: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind2nd (minus < double >(), 10));
  cout << "l1-10: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind2nd (multiplies < double >(), 10));
  cout << "l1*10: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind2nd (divides < double >(), 10));
  cout << "l1/10: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  return 0;
}
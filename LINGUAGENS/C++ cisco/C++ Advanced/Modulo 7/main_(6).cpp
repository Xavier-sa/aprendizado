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
  int t1[] = { 1, 2, 3, 4, 5 };
  list < int >l1 (t1, t1 + 5);
  list < int >l2 (l1.size ());

  cout << "Source collection:\n";
  cout << "l1: ";
  print (l1.begin (), l1.end ());
  cout << endl;

  cout << "simple bind1st\n";

  transform (l1.begin (), l1.end (), l2.begin (),
	     bind1st (not_equal_to < int >(), 3));
  cout << "Places of collection elements not equals 3: " << endl;
  cout << "l2: ";
  print (l2.begin (), l2.end ());
  cout << endl;

  int counterL1 =
    count_if (l1.begin (), l1.end (), bind1st (not_equal_to < int >(), 3));
  cout << "There are " << counterL1 <<
    " elements that are not equal to 3 (based on l1 collection).\n";
  int counterL2 =
    count_if (l2.begin (), l2.end (), bind1st (equal_to < int >(), 1));
  cout << "There are " << counterL2 <<
    " elements that are equal to 1 (based on l2 collection true/false test).\n";

  return 0;
}
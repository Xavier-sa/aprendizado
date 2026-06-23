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
add (int a, int b)
{
  return a + b;
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

  cout << "Adding 10 to each element using above function 'add'\n";

  cout << "bind2nd or bind1st cannot be used with functions\n";
  //transform(l1.begin(), l1.end(), l2.begin(),  bind2nd(add, 10));

  cout << "Solution: convert function to function object:\n";
  transform (l1.begin (), l1.end (), l2.begin (),
	     bind2nd (ptr_fun (add), 10));


  cout << "l1+10: ";
  print (l2.begin (), l2.end ());
  cout << endl;


  return 0;
}
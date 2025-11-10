#include <vector>
#include <deque>
#include <iostream>

using namespace std;

template < class C > void
print (const C & container)
{
  for (unsigned i = 0; i < container.size (); ++i)
    {
      cout << container.at (i) << " ";
    }
  cout << endl;
}

int
main ()
{
  int a[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  //containers
  vector < int >v (10);
  deque < int >d (10);

  for (unsigned i = 0; i < 10; ++i)
    {
      d.at (i) = a[i];
      v.at (i) = a[i];
    }
  print (v);
  print (d);
  cout << "Accessing out of range element:\n";
  try
  {
    cout << v.at (11) << endl;
  }
  catch (out_of_range & ex)
  {
    cout << ex.what () << endl;
  }

  try
  {
    cout << d.at (11) << endl;
  }
  catch (out_of_range & ex)
  {
    cout << ex.what () << endl;
  }


  return 0;
}
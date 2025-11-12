#include <vector>
#include <deque>
#include <iostream>

using namespace std;

int
main ()
{
  //vector
  vector < int >v (10, 0);
  for (unsigned i = 0; i < v.size (); ++i)
    {
      v[i] = i + 1;
    }
  cout << "Size (v):  " << v.size () << endl;
  for (unsigned i = 0; i < v.size (); ++i)
    {
      cout << v[i] << " ";
    }
  cout << endl;
  //deque
  deque < int >d (v.begin (), v.begin () + 5);
  cout << "Size (d):  " << d.size () << endl;
  for (unsigned i = 0; i < d.size (); ++i)
    {
      cout << d[i] << " ";
    }
  cout << endl;
  return 0;
}
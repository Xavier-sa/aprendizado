#include <vector>
#include <iostream>
using namespace std;

int
main ()
{
  vector < int >v1 (10);
  vector < int >v2 = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
  for (unsigned i = 0; i < v1.size (); ++i)
    {
      v1[i] = i;
    }
  for (unsigned i = 0; i < v1.size (); ++i)
    {
      cout << v1[i] << " ";
      cout << v2[i] << " ";
    }
  cout << endl;

  cout << v1.size () << endl;
  v1.push_back (100);
  cout << v1.size () << endl;
  v1.pop_back ();
  cout << v1.size () << endl;
  return 0;
}
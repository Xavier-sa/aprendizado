#include <vector>
#include <iostream>

using namespace std;

int
main ()
{
  //first one
  vector < int >v1 (10, 0);
  for (unsigned i = 0; i < v1.size (); ++i)
    {
      v1[i] = i + 1;
    }
  cout << "Size (v1):  " << v1.size () << endl;
  for (unsigned i = 0; i < v1.size (); ++i)
    {
      cout << v1[i] << " ";
    }
  cout << endl;
  //second one;
  vector < int >v2 (v1.begin (), v1.begin () + 5);
  cout << "Size (v2):  " << v2.size () << endl;
  for (unsigned i = 0; i < v2.size (); ++i)
    {
      cout << v2[i] << " ";
    }
  cout << endl;
  return 0;
}
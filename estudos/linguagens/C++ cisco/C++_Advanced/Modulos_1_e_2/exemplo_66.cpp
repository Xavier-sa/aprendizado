#include <vector>
#include <iostream>

using namespace std;

int
main ()
{
  vector < int >v1 (10, 0);
  cout << "Size: " << v1.size () << endl;
  for (unsigned i = 0; i < v1.size (); ++i)
    {
      cout << v1[i] << " ";
    }
  cout << endl;
  return 0;
}